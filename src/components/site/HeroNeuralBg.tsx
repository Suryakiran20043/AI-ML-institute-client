import { useEffect, useRef } from "react";

/**
 * Cinematic AI hero background.
 * - Dense neural network (up to ~220 nodes desktop / ~90 mobile)
 * - Pulsing nodes, animated data-flow packets along links
 * - Aurora + slow morphing gradient mesh (purple / blue / cyan / navy)
 * - Digital wave shimmer at the bottom
 * - Subtle mouse parallax (max ~12px) and scroll parallax
 * - Floating low-opacity AI iconography (SVG, CSS animated)
 * - Auto-throttles on mobile / reduced-motion; pauses when off-screen or hidden
 */
export function HeroNeuralBg() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const mesh = meshRef.current;
    const icons = iconsRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const isSmall = window.matchMedia("(max-width: 768px)").matches;
    const hwCores =
      typeof navigator !== "undefined" && "hardwareConcurrency" in navigator
        ? (navigator as Navigator & { hardwareConcurrency: number }).hardwareConcurrency
        : 4;
    const isLowEnd = hwCores <= 4 || isSmall;

    const NODE_COUNT = prefersReduced ? 0 : isSmall ? 40 : isLowEnd ? 150 : 220;
    const LINK_DIST = isSmall ? 70 : 140;
    const MAX_PACKETS = prefersReduced ? 0 : isSmall ? 8 : 42;

    let dpr = Math.min(window.devicePixelRatio || 1, isLowEnd ? 1.5 : 2);
    let width = 0;
    let height = 0;

    type Node = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      hue: number;
      phase: number; // pulse phase
      pulseSpeed: number;
    };
    type Packet = { a: number; b: number; t: number; speed: number };

    let nodes: Node[] = [];
    let packets: Packet[] = [];

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    function seed() {
      nodes = new Array(NODE_COUNT).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: rand(-0.16, 0.16),
        vy: rand(-0.16, 0.16),
        r: rand(0.8, 2.0),
        hue: rand(0, 1),
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: rand(0.35, 0.7), // radians/sec -> ~3–5s cycle
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
      if (nodes.length === 0 && NODE_COUNT > 0) seed();
    }

    // Cursor parallax
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointerMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      mouse.tx = nx * 24; // max ~12px each side
      mouse.ty = ny * 24;
    };
    const onPointerLeave = () => {
      mouse.tx = 0;
      mouse.ty = 0;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    let auroraPhase = 0;
    function drawAurora() {
      if (!ctx) return;
      auroraPhase += 0.0011;
      const cx1 = width * (0.28 + 0.09 * Math.sin(auroraPhase * 0.9));
      const cy1 = height * (0.32 + 0.07 * Math.cos(auroraPhase * 0.7));
      const cx2 = width * (0.78 + 0.07 * Math.cos(auroraPhase));
      const cy2 = height * (0.7 + 0.06 * Math.sin(auroraPhase * 1.1));
      const cx3 = width * (0.5 + 0.12 * Math.sin(auroraPhase * 0.5));
      const cy3 = height * (0.5 + 0.08 * Math.cos(auroraPhase * 0.4));

      const g1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, Math.max(width, height) * 0.6);
      g1.addColorStop(0, "rgba(124, 58, 237, 0.22)");
      g1.addColorStop(1, "rgba(124, 58, 237, 0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      const g2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, Math.max(width, height) * 0.6);
      g2.addColorStop(0, "rgba(34, 211, 238, 0.2)");
      g2.addColorStop(1, "rgba(34, 211, 238, 0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      if (!isLowEnd) {
        const g3 = ctx.createRadialGradient(cx3, cy3, 0, cx3, cy3, Math.max(width, height) * 0.5);
        g3.addColorStop(0, "rgba(59, 130, 246, 0.16)");
        g3.addColorStop(1, "rgba(59, 130, 246, 0)");
        ctx.fillStyle = g3;
        ctx.fillRect(0, 0, width, height);
      }
    }

    let wavePhase = 0;
    function drawWave() {
      if (!ctx) return;
      wavePhase += 0.007;
      const midY = height * 0.82;
      const amp = height * 0.028;
      // Layered translucent waves
      for (let layer = 0; layer < 2; layer++) {
        ctx.beginPath();
        const offset = layer * 1.3;
        for (let x = 0; x <= width; x += 10) {
          const y =
            midY +
            layer * 10 +
            Math.sin(x * 0.012 + wavePhase + offset) * amp +
            Math.sin(x * 0.03 + wavePhase * 1.7 + offset) * amp * 0.35;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle =
          layer === 0 ? "rgba(129, 140, 248, 0.22)" : "rgba(34, 211, 238, 0.14)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      // Glowing dots riding the front wave
      if (!isLowEnd) {
        for (let x = 0; x <= width; x += 46) {
          const y =
            midY +
            Math.sin(x * 0.012 + wavePhase) * amp +
            Math.sin(x * 0.03 + wavePhase * 1.7) * amp * 0.35;
          ctx.beginPath();
          ctx.arc(x, y, 1.4, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(147, 197, 253, 0.55)";
          ctx.fill();
        }
      }
    }

    function nodeColor(hue: number, alpha: number) {
      if (hue < 0.5) {
        const t = hue / 0.5;
        const r = Math.round(124 + (99 - 124) * t);
        const g = Math.round(58 + (102 - 58) * t);
        const b = Math.round(237 + (241 - 237) * t);
        return `rgba(${r},${g},${b},${alpha})`;
      }
      const t = (hue - 0.5) / 0.5;
      const r = Math.round(99 + (34 - 99) * t);
      const g = Math.round(102 + (211 - 102) * t);
      const b = Math.round(241 + (238 - 241) * t);
      return `rgba(${r},${g},${b},${alpha})`;
    }

    let last = performance.now();
    let parallaxX = 0;
    let parallaxY = 0;

    function step(now: number) {
      if (!ctx) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      // Ease parallax toward target
      parallaxX += (mouse.tx - parallaxX) * 0.05;
      parallaxY += (mouse.ty - parallaxY) * 0.05;

      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(parallaxX, parallaxY);

      drawAurora();
      drawWave();

      // Move nodes
      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];
        p.x += p.vx;
        p.y += p.vy;
        p.phase += p.pulseSpeed * dt;
        if (p.x < -20) p.x = width + 20;
        else if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        else if (p.y > height + 20) p.y = -20;
      }

      // Connections — collect neighbor pairs for packet spawning
      const linkMaxSq = LINK_DIST * LINK_DIST;
      ctx.lineWidth = 1;
      const activeLinks: Array<[number, number]> = [];
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        // Sparse inner loop step on low-end to save cycles
        const jStep = 1;
        for (let j = i + 1; j < nodes.length; j += jStep) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkMaxSq) {
            const t = 1 - d2 / linkMaxSq;
            // Randomly modulate alpha over time -> connections appear/disappear naturally
            const flicker = 0.75 + 0.25 * Math.sin(now * 0.001 + i * 0.13 + j * 0.07);
            const alpha = t * 0.28 * flicker;
            ctx.strokeStyle = nodeColor((a.hue + b.hue) * 0.5, alpha);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            if (activeLinks.length < 400) activeLinks.push([i, j]);
          }
        }
      }

      // Spawn packets along random active links
      if (packets.length < MAX_PACKETS && activeLinks.length > 0 && Math.random() < 0.35) {
        const [ai, bi] = activeLinks[(Math.random() * activeLinks.length) | 0];
        packets.push({ a: ai, b: bi, t: 0, speed: rand(0.6, 1.4) });
      }

      // Advance + draw packets
      for (let k = packets.length - 1; k >= 0; k--) {
        const pk = packets[k];
        pk.t += pk.speed * dt;
        if (pk.t >= 1) {
          packets.splice(k, 1);
          continue;
        }
        const a = nodes[pk.a];
        const b = nodes[pk.b];
        if (!a || !b) {
          packets.splice(k, 1);
          continue;
        }
        const x = a.x + (b.x - a.x) * pk.t;
        const y = a.y + (b.y - a.y) * pk.t;
        const alpha = Math.sin(pk.t * Math.PI); // fade in/out along path
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(186, 230, 253, ${0.9 * alpha})`;
        ctx.fill();
        if (!isLowEnd) {
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(103, 232, 249, ${0.25 * alpha})`;
          ctx.fill();
        }
      }

      // Nodes with pulse
      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];
        const pulse = 0.5 + 0.5 * Math.sin(p.phase); // 0..1
        const r = p.r * (1 + pulse * 0.6);
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor(p.hue, 0.85);
        ctx.fill();
        if (!isLowEnd) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * (3 + pulse * 1.5), 0, Math.PI * 2);
          ctx.fillStyle = nodeColor(p.hue, 0.06 + 0.05 * pulse);
          ctx.fill();
        }
      }

      ctx.restore();
    }

    let rafId = 0;
    let running = true;

    function loop(now: number) {
      if (!running) return;
      step(now);
      rafId = requestAnimationFrame(loop);
    }

    resize();
    if (NODE_COUNT > 0) {
      rafId = requestAnimationFrame(loop);
    } else {
      seed();
      step(performance.now());
    }

    // Mesh + icons parallax (mouse + scroll)
    let scrollRaf = 0;
    const applyParallax = () => {
      const scrollY = window.scrollY;
      const meshTx = mouse.tx * 0.6;
      const meshTy = mouse.ty * 0.6 + scrollY * 0.15;
      if (mesh) mesh.style.transform = `translate3d(${meshTx.toFixed(2)}px, ${meshTy.toFixed(2)}px, 0)`;
      if (icons) icons.style.transform = `translate3d(${(mouse.tx * 0.35).toFixed(2)}px, ${(mouse.ty * 0.35 + scrollY * 0.08).toFixed(2)}px, 0)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(scrollRaf);
      scrollRaf = requestAnimationFrame(applyParallax);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Also refresh parallax on each mouse move via same rAF
    const parallaxLoopId = { id: 0 };
    const parallaxTick = () => {
      applyParallax();
      parallaxLoopId.id = requestAnimationFrame(parallaxTick);
    };
    if (!prefersReduced) parallaxLoopId.id = requestAnimationFrame(parallaxTick);

    // Pause when off-screen
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !running && NODE_COUNT > 0) {
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
      } else if (NODE_COUNT > 0) {
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
      cancelAnimationFrame(scrollRaf);
      cancelAnimationFrame(parallaxLoopId.id);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Slow morphing gradient mesh */}
      <div
        ref={meshRef}
        className="absolute -inset-[10%] opacity-[0.55] mix-blend-screen animate-hero-mesh"
        style={{
          background:
            "radial-gradient(45% 40% at 20% 30%, rgba(124,58,237,0.35), transparent 70%), radial-gradient(40% 35% at 80% 25%, rgba(34,211,238,0.28), transparent 70%), radial-gradient(50% 45% at 60% 80%, rgba(59,130,246,0.28), transparent 70%), radial-gradient(60% 55% at 15% 85%, rgba(15,23,42,0.55), transparent 75%)",
          filter: "blur(40px)",
          willChange: "transform",
        }}
      />

      {/* Neural network canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-[0.6] mix-blend-screen"
        style={{ willChange: "transform" }}
      />

      {/* Floating AI iconography */}
      <div
        ref={iconsRef}
        className="absolute inset-0 hidden md:block"
        style={{ willChange: "transform" }}
      >
        <FloatingIcon className="top-[12%] left-[8%] animate-float-a" delay={0}>
          <ChipIcon />
        </FloatingIcon>
        <FloatingIcon className="top-[22%] right-[10%] animate-float-b" delay={1.2}>
          <BrainIcon />
        </FloatingIcon>
        <FloatingIcon className="top-[62%] left-[14%] animate-float-c" delay={2.4}>
          <CircuitIcon />
        </FloatingIcon>
        <FloatingIcon className="top-[70%] right-[16%] animate-float-a" delay={0.6}>
          <BracketsIcon />
        </FloatingIcon>
        <FloatingIcon className="top-[40%] left-[46%] animate-float-b" delay={1.8}>
          <MLIcon />
        </FloatingIcon>
        <FloatingIcon className="top-[50%] right-[38%] animate-float-c" delay={3}>
          <GridIcon />
        </FloatingIcon>
        <FloatingIcon className="top-[30%] left-[30%] animate-float-a" delay={2}>
          <GradCapIcon />
        </FloatingIcon>
        <FloatingIcon className="top-[78%] left-[38%] animate-float-b" delay={4}>
          <NodeIcon />
        </FloatingIcon>
      </div>
    </div>
  );
}

function FloatingIcon({
  className,
  delay,
  children,
}: {
  className?: string;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`absolute text-cyan-200/40 ${className ?? ""}`}
      style={{ animationDelay: `${delay ?? 0}s` }}
    >
      {children}
    </div>
  );
}

const stroke = "currentColor";

function ChipIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden>
      <rect x="10" y="10" width="32" height="32" rx="4" stroke={stroke} strokeWidth="1" />
      <rect x="18" y="18" width="16" height="16" rx="2" stroke={stroke} strokeWidth="1" />
      {[14, 22, 30, 38].map((y) => (
        <g key={y}>
          <line x1="4" x2="10" y1={y} y2={y} stroke={stroke} strokeWidth="1" />
          <line x1="42" x2="48" y1={y} y2={y} stroke={stroke} strokeWidth="1" />
          <line x1={y} x2={y} y1="4" y2="10" stroke={stroke} strokeWidth="1" />
          <line x1={y} x2={y} y1="42" y2="48" stroke={stroke} strokeWidth="1" />
        </g>
      ))}
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden>
      <path
        d="M20 12c-4 0-7 3-7 7 0 1.5.5 2.8 1.2 3.9C11.6 24.4 10 27 10 30c0 3.2 1.9 5.9 4.6 7-.4 1-.6 2-.6 3 0 4.4 3.6 8 8 8 3 0 5.6-1.6 7-4M36 12c4 0 7 3 7 7 0 1.5-.5 2.8-1.2 3.9C44.4 24.4 46 27 46 30c0 3.2-1.9 5.9-4.6 7 .4 1 .6 2 .6 3 0 4.4-3.6 8-8 8-3 0-5.6-1.6-7-4V12"
        stroke={stroke}
        strokeWidth="1"
      />
      <circle cx="22" cy="22" r="1.2" fill={stroke} />
      <circle cx="34" cy="30" r="1.2" fill={stroke} />
      <circle cx="24" cy="38" r="1.2" fill={stroke} />
    </svg>
  );
}

function CircuitIcon() {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" aria-hidden>
      <path d="M6 30h12l4-4h10l4 4h18M6 44h20l4-4h24M6 16h8l4 4h34" stroke={stroke} strokeWidth="1" />
      <circle cx="18" cy="30" r="1.6" fill={stroke} />
      <circle cx="32" cy="26" r="1.6" fill={stroke} />
      <circle cx="26" cy="44" r="1.6" fill={stroke} />
      <circle cx="18" cy="20" r="1.6" fill={stroke} />
    </svg>
  );
}

function BracketsIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
      <path d="M18 8L8 24l10 16M30 8l10 16-10 16" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M27 14l-6 20" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function MLIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden>
      {[10, 28, 46].map((x) => (
        <g key={x}>
          <circle cx={x} cy="10" r="2" stroke={stroke} strokeWidth="1" />
          <circle cx={x} cy="28" r="2" stroke={stroke} strokeWidth="1" />
          <circle cx={x} cy="46" r="2" stroke={stroke} strokeWidth="1" />
        </g>
      ))}
      {[10, 28, 46].map((x1) =>
        [10, 28, 46].map((y2) => (
          <line
            key={`${x1}-${y2}`}
            x1={x1}
            y1="10"
            x2={x1 === 10 ? 28 : x1 === 28 ? 46 : 10}
            y2={y2}
            stroke={stroke}
            strokeWidth="0.6"
            opacity="0.6"
          />
        )),
      )}
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden>
      {Array.from({ length: 6 }).map((_, i) => (
        <g key={i}>
          <line x1={4 + i * 8} y1="4" x2={4 + i * 8} y2="48" stroke={stroke} strokeWidth="0.6" />
          <line x1="4" y1={4 + i * 8} x2="48" y2={4 + i * 8} stroke={stroke} strokeWidth="0.6" />
        </g>
      ))}
    </svg>
  );
}
