import { useEffect, useRef } from "react";

/**
 * Lightweight canvas-based neural network animation for the hero background.
 * - 80–120 particles on desktop, ~45 on mobile (or 0 if reduced-motion).
 * - Glowing nodes connected by animated lines when within a distance threshold.
 * - Soft aurora gradient painted per-frame in blue/purple/cyan.
 * - Pauses when off-screen via IntersectionObserver.
 * - Uses transform-friendly canvas draws only; runs at ~60 FPS on mid devices.
 * - Sits behind hero content with mix-blend-screen; overall opacity kept low
 *   so headline text remains perfectly readable.
 */
export function HeroNeuralBg() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    // Detect low-power / small viewport → cut particle count and effects
    const isSmall = window.matchMedia("(max-width: 768px)").matches;
    const hwCores =
      typeof navigator !== "undefined" && "hardwareConcurrency" in navigator
        ? (navigator as Navigator & { hardwareConcurrency: number }).hardwareConcurrency
        : 4;
    const isLowEnd = hwCores <= 4 || isSmall;

    const PARTICLE_COUNT = prefersReduced ? 0 : isSmall ? 45 : isLowEnd ? 80 : 110;
    const LINK_DIST = isSmall ? 90 : 130;
    const DRAW_AURORA = !isLowEnd;

    // DPR-aware sizing
    let dpr = Math.min(window.devicePixelRatio || 1, isLowEnd ? 1.5 : 2);
    let width = 0;
    let height = 0;

    type P = { x: number; y: number; vx: number; vy: number; r: number; hue: number };
    let particles: P[] = [];

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    function seed() {
      particles = new Array(PARTICLE_COUNT).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: rand(-0.18, 0.18),
        vy: rand(-0.18, 0.18),
        r: rand(0.9, 1.9),
        hue: rand(0, 1), // 0=purple, 0.5=blue, 1=cyan
      }));
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
      if (particles.length === 0 && PARTICLE_COUNT > 0) seed();
    }

    // Aurora phase progresses very slowly
    let auroraPhase = 0;

    function drawAurora() {
      if (!ctx) return;
      auroraPhase += 0.0012;
      const cx1 = width * (0.3 + 0.08 * Math.sin(auroraPhase * 0.9));
      const cy1 = height * (0.35 + 0.06 * Math.cos(auroraPhase * 0.7));
      const cx2 = width * (0.75 + 0.06 * Math.cos(auroraPhase));
      const cy2 = height * (0.7 + 0.05 * Math.sin(auroraPhase * 1.1));

      const g1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, Math.max(width, height) * 0.55);
      g1.addColorStop(0, "rgba(124, 58, 237, 0.18)"); // brand purple
      g1.addColorStop(1, "rgba(124, 58, 237, 0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      const g2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, Math.max(width, height) * 0.55);
      g2.addColorStop(0, "rgba(34, 211, 238, 0.16)"); // brand cyan
      g2.addColorStop(1, "rgba(34, 211, 238, 0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);
    }

    // Slow digital wave
    let wavePhase = 0;
    function drawWave() {
      if (!ctx) return;
      wavePhase += 0.006;
      ctx.beginPath();
      const amp = height * 0.03;
      const midY = height * 0.72;
      for (let x = 0; x <= width; x += 12) {
        const y =
          midY +
          Math.sin(x * 0.012 + wavePhase) * amp +
          Math.sin(x * 0.03 + wavePhase * 1.7) * amp * 0.35;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(129, 140, 248, 0.18)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    function nodeColor(hue: number, alpha: number) {
      // hue 0..1 mapped across purple → blue → cyan
      if (hue < 0.5) {
        const t = hue / 0.5; // purple → blue
        const r = Math.round(124 + (99 - 124) * t);
        const g = Math.round(58 + (102 - 58) * t);
        const b = Math.round(237 + (241 - 237) * t);
        return `rgba(${r},${g},${b},${alpha})`;
      }
      const t = (hue - 0.5) / 0.5; // blue → cyan
      const r = Math.round(99 + (34 - 99) * t);
      const g = Math.round(102 + (211 - 102) * t);
      const b = Math.round(241 + (238 - 241) * t);
      return `rgba(${r},${g},${b},${alpha})`;
    }

    function step() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      if (DRAW_AURORA) drawAurora();
      drawWave();

      // Update + draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = width + 20;
        else if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        else if (p.y > height + 20) p.y = -20;
      }

      // Connections (skip on low-end if particle count large)
      const linkMax = LINK_DIST;
      const linkMaxSq = linkMax * linkMax;
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkMaxSq) {
            const alpha = (1 - d2 / linkMaxSq) * 0.22;
            ctx.strokeStyle = nodeColor((a.hue + b.hue) * 0.5, alpha);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Nodes with tiny glow
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor(p.hue, 0.85);
        ctx.fill();
        if (!isLowEnd) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 3.2, 0, Math.PI * 2);
          ctx.fillStyle = nodeColor(p.hue, 0.08);
          ctx.fill();
        }
      }
    }

    let rafId = 0;
    let running = true;

    function loop() {
      if (!running) return;
      step();
      rafId = requestAnimationFrame(loop);
    }

    resize();
    if (PARTICLE_COUNT > 0) {
      loop();
    } else {
      // Reduced motion: paint a single static frame (aurora + faint nodes only)
      seed();
      step();
    }

    // Pause when hero is off-screen
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !running && PARTICLE_COUNT > 0) {
            running = true;
            loop();
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
      } else if (PARTICLE_COUNT > 0) {
        running = true;
        loop();
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
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-[0.55] mix-blend-screen"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
