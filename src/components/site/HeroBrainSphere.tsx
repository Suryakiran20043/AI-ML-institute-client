import { useEffect, useRef } from "react";

/**
 * Holographic 3D neural sphere for the hero background.
 * - Wireframe sphere of ~180 nodes, slowly rotating on Y (and gentle X wobble).
 * - Connections between nearby nodes in 3D — depth-aware alpha for volumetric feel.
 * - Cyan / purple pulsing core with radial glow.
 * - Animated packets travel along connections; particles orbit around the sphere.
 * - Rendered on a canvas positioned to the right of the hero at 10–15% opacity.
 * - Pauses off-screen / hidden tab / prefers-reduced-motion.
 */
export function HeroBrainSphere() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const isSmall = window.matchMedia("(max-width: 768px)").matches;
    const hwCores =
      "hardwareConcurrency" in navigator
        ? (navigator as Navigator & { hardwareConcurrency: number }).hardwareConcurrency
        : 4;
    const isLowEnd = hwCores <= 4 || isSmall;

    const N = isSmall ? 55 : isLowEnd ? 150 : 200;
    const LINK_NEIGHBORS = isSmall ? 2 : 4;
    const ORBIT_PARTICLES = prefersReduced ? 0 : isSmall ? 10 : 44;

    let dpr = Math.min(window.devicePixelRatio || 1, isLowEnd ? 1.5 : 2);
    let width = 0;
    let height = 0;
    let radius = 0;

    type Node3 = { x: number; y: number; z: number; hue: number; phase: number };
    type Orbit = { a: number; tilt: number; speed: number; r: number; size: number; hue: number };

    let nodes: Node3[] = [];
    let neighbors: number[][] = [];
    let orbits: Orbit[] = [];
    type Packet = { i: number; j: number; t: number; speed: number };
    let packets: Packet[] = [];

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    function seed() {
      nodes = [];
      // Fibonacci sphere for even distribution
      const g = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < N; i++) {
        const y = 1 - (i / (N - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = g * i;
        nodes.push({
          x: Math.cos(theta) * r,
          y,
          z: Math.sin(theta) * r,
          hue: Math.random(),
          phase: Math.random() * Math.PI * 2,
        });
      }
      // Precompute K nearest neighbors
      neighbors = nodes.map((_, i) => {
        const d: Array<[number, number]> = [];
        for (let j = 0; j < nodes.length; j++) {
          if (j === i) continue;
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dz = nodes[i].z - nodes[j].z;
          d.push([j, dx * dx + dy * dy + dz * dz]);
        }
        d.sort((a, b) => a[1] - b[1]);
        return d.slice(0, LINK_NEIGHBORS).map(([idx]) => idx);
      });
      orbits = new Array(ORBIT_PARTICLES).fill(0).map(() => ({
        a: Math.random() * Math.PI * 2,
        tilt: rand(-0.6, 0.6),
        speed: rand(0.15, 0.35) * (Math.random() < 0.5 ? -1 : 1),
        r: rand(1.05, 1.35),
        size: rand(0.8, 1.6),
        hue: Math.random(),
      }));
      packets = [];
    }

    function resize() {
      if (!canvas || !wrap || !ctx) return;
      const rect = wrap.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      radius = Math.min(width, height) * 0.42;
      if (nodes.length === 0) seed();
    }

    function color(hue: number, alpha: number) {
      // cyan (34,211,238) ↔ purple (167,139,250)
      const r = Math.round(34 + (167 - 34) * hue);
      const g = Math.round(211 + (139 - 211) * hue);
      const b = Math.round(238 + (250 - 238) * hue);
      return `rgba(${r},${g},${b},${alpha})`;
    }

    let ry = 0;
    let rx = 0;
    let last = performance.now();
    let coreT = 0;

    function step(now: number) {
      if (!ctx) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      ry += dt * 0.18; // slow rotation
      rx = Math.sin(now * 0.00015) * 0.25;
      coreT += dt;

      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;

      // Volumetric glow behind sphere
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.7);
      const pulse = 0.5 + 0.5 * Math.sin(coreT * 0.9);
      glow.addColorStop(0, `rgba(103, 232, 249, ${0.35 + 0.15 * pulse})`);
      glow.addColorStop(0.45, `rgba(139, 92, 246, ${0.18 + 0.08 * pulse})`);
      glow.addColorStop(1, "rgba(139, 92, 246, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // Project nodes
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const proj: Array<{ px: number; py: number; z: number; hue: number; phase: number }> = [];
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        // rotate Y
        let x = n.x * cosY + n.z * sinY;
        let z = -n.x * sinY + n.z * cosY;
        let y = n.y;
        // rotate X
        const y2 = y * cosX - z * sinX;
        z = y * sinX + z * cosX;
        y = y2;
        proj.push({
          px: cx + x * radius,
          py: cy + y * radius,
          z,
          hue: n.hue,
          phase: n.phase + coreT * 0.8,
        });
      }

      // Draw connections (depth-aware)
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = proj[i];
        const nbs = neighbors[i];
        for (let k = 0; k < nbs.length; k++) {
          const j = nbs[k];
          if (j < i) continue; // draw each pair once
          const b = proj[j];
          const zAvg = (a.z + b.z) * 0.5; // -1..1
          const depth = (zAvg + 1) * 0.5; // 0 back .. 1 front
          const flick = 0.7 + 0.3 * Math.sin(coreT * 1.2 + i * 0.31 + j * 0.17);
          const alpha = (0.05 + depth * 0.35) * flick;
          ctx.strokeStyle = color((a.hue + b.hue) * 0.5, alpha);
          ctx.beginPath();
          ctx.moveTo(a.px, a.py);
          ctx.lineTo(b.px, b.py);
          ctx.stroke();
        }
      }

      // Spawn packets randomly along connections
      if (packets.length < (isSmall ? 14 : 30) && Math.random() < 0.5) {
        const i = (Math.random() * nodes.length) | 0;
        const nbs = neighbors[i];
        const j = nbs[(Math.random() * nbs.length) | 0];
        packets.push({ i, j, t: 0, speed: rand(0.5, 1.2) });
      }
      for (let k = packets.length - 1; k >= 0; k--) {
        const pk = packets[k];
        pk.t += pk.speed * dt;
        if (pk.t >= 1) {
          packets.splice(k, 1);
          continue;
        }
        const a = proj[pk.i];
        const b = proj[pk.j];
        const x = a.px + (b.px - a.px) * pk.t;
        const y = a.py + (b.py - a.py) * pk.t;
        const depth = ((a.z + b.z) * 0.5 + 1) * 0.5;
        const fade = Math.sin(pk.t * Math.PI);
        ctx.beginPath();
        ctx.arc(x, y, 1.6 + depth * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(186, 230, 253, ${0.9 * fade * (0.4 + depth * 0.6)})`;
        ctx.fill();
      }

      // Sort nodes back-to-front, draw
      const order = proj.map((_, i) => i).sort((a, b) => proj[a].z - proj[b].z);
      for (let k = 0; k < order.length; k++) {
        const i = order[k];
        const p = proj[i];
        const depth = (p.z + 1) * 0.5;
        const pl = 0.5 + 0.5 * Math.sin(p.phase);
        const size = 0.9 + depth * 1.6 + pl * 0.6;
        ctx.beginPath();
        ctx.arc(p.px, p.py, size, 0, Math.PI * 2);
        ctx.fillStyle = color(p.hue, 0.35 + depth * 0.55);
        ctx.fill();
        if (depth > 0.5) {
          ctx.beginPath();
          ctx.arc(p.px, p.py, size * 3.2, 0, Math.PI * 2);
          ctx.fillStyle = color(p.hue, 0.06 * depth);
          ctx.fill();
        }
      }

      // Bright pulsing core
      const coreR = radius * (0.12 + 0.02 * pulse);
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 3);
      coreGrad.addColorStop(0, `rgba(224, 242, 254, ${0.55 + 0.2 * pulse})`);
      coreGrad.addColorStop(0.4, `rgba(103, 232, 249, ${0.3 + 0.1 * pulse})`);
      coreGrad.addColorStop(1, "rgba(139, 92, 246, 0)");
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR * 3, 0, Math.PI * 2);
      ctx.fill();

      // Orbiting particles
      for (let i = 0; i < orbits.length; i++) {
        const o = orbits[i];
        o.a += o.speed * dt;
        const ox = Math.cos(o.a) * radius * o.r;
        const oy = Math.sin(o.a) * radius * o.r * Math.cos(o.tilt);
        const oz = Math.sin(o.a) * radius * o.r * Math.sin(o.tilt);
        // rotate with sphere for coherence
        const rxp = ox * cosY + oz * sinY;
        const rzp = -ox * sinY + oz * cosY;
        const ryp = oy;
        const y2 = ryp * cosX - rzp * sinX;
        const zF = ryp * sinX + rzp * cosX;
        const depth = (zF / (radius * 1.4) + 1) * 0.5;
        ctx.beginPath();
        ctx.arc(cx + rxp, cy + y2, o.size * (0.7 + depth * 0.6), 0, Math.PI * 2);
        ctx.fillStyle = color(o.hue, 0.35 + depth * 0.4);
        ctx.fill();
      }
    }

    let rafId = 0;
    let running = true;
    function loop(now: number) {
      if (!running) return;
      step(now);
      rafId = requestAnimationFrame(loop);
    }

    resize();
    if (prefersReduced) {
      step(performance.now());
    } else {
      rafId = requestAnimationFrame(loop);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !running && !prefersReduced) {
            running = true;
            last = performance.now();
            rafId = requestAnimationFrame(loop);
          } else if (!e.isIntersecting && running) {
            running = false;
            cancelAnimationFrame(rafId);
          }
        }
      },
      { threshold: 0 },
    );
    io.observe(wrap);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafId);
      } else if (!prefersReduced) {
        running = true;
        last = performance.now();
        rafId = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    let resizeRaf = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        dpr = Math.min(window.devicePixelRatio || 1, isLowEnd ? 1.5 : 2);
        resize();
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(resizeRaf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none absolute right-[-8%] top-1/2 -translate-y-1/2 hidden md:block h-[110%] w-[62%] lg:w-[52%] opacity-[0.14] lg:opacity-[0.15]"
      style={{ mixBlendMode: "screen" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
