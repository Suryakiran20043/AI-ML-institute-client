/**
 * Holographic light-beam pedestal for the left-side brain sphere.
 * Pure CSS/SVG — no canvas. Sits behind the sphere and rises from a
 * glowing platform up into the sphere center.
 * - Vertical volumetric beam (soft gradient, animated)
 * - Concentric expanding rings at the base
 * - Faint "AI" holographic label behind the sphere
 * - Auto-hidden on small screens; respects prefers-reduced-motion via CSS.
 */
export function HeroLeftBeam() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden md:block"
      style={{ mixBlendMode: "screen" }}
    >
      {/* Anchor container matches HeroBrainSphere left placement */}
      <div className="absolute left-[-10%] top-1/2 -translate-y-1/2 h-[110%] w-[58%] lg:w-[46%]">
        {/* Vertical light beam (sphere center → pedestal) */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-[40%] bottom-[12%] w-[6%] opacity-70 animate-beam-pulse"
          style={{
            background:
              "linear-gradient(180deg, rgba(103,232,249,0) 0%, rgba(103,232,249,0.55) 25%, rgba(139,92,246,0.6) 65%, rgba(232,242,255,0.85) 92%, rgba(103,232,249,0) 100%)",
            filter: "blur(10px)",
          }}
        />
        {/* Sharp inner beam */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-[42%] bottom-[14%] w-[1.5px] opacity-90"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(224,242,254,0.85) 40%, rgba(186,230,253,1) 90%)",
            boxShadow: "0 0 12px rgba(103,232,249,0.9), 0 0 32px rgba(139,92,246,0.6)",
          }}
        />

        {/* Pedestal — concentric rings */}
        <div className="absolute left-1/2 bottom-[6%] -translate-x-1/2 h-[18%] w-[62%]">
          <div className="absolute inset-x-0 bottom-[46%] flex items-end justify-center">
            <div
              className="h-3 w-3 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(224,242,254,1) 0%, rgba(103,232,249,0.9) 40%, rgba(139,92,246,0) 80%)",
                boxShadow: "0 0 24px rgba(103,232,249,0.9), 0 0 60px rgba(139,92,246,0.6)",
              }}
            />
          </div>
          <div
            className="absolute left-1/2 bottom-[42%] -translate-x-1/2 rounded-full border border-cyan-300/60 animate-ring-a"
            style={{ width: "58%", aspectRatio: "3 / 1", boxShadow: "0 0 24px rgba(103,232,249,0.35) inset" }}
          />
          <div
            className="absolute left-1/2 bottom-[30%] -translate-x-1/2 rounded-full border border-cyan-200/40 animate-ring-b"
            style={{ width: "78%", aspectRatio: "3.4 / 1" }}
          />
          <div
            className="absolute left-1/2 bottom-[16%] -translate-x-1/2 rounded-full border border-purple-300/30 animate-ring-c"
            style={{ width: "100%", aspectRatio: "3.8 / 1" }}
          />
        </div>

        {/* Holographic AI label behind the sphere */}
        <div className="absolute left-1/2 top-[28%] -translate-x-1/2 select-none">
          <span
            className="font-display font-semibold tracking-[0.08em] text-[clamp(2rem,4.2vw,4.5rem)] animate-ai-flicker"
            style={{
              color: "rgba(224,242,254,0.55)",
              textShadow:
                "0 0 18px rgba(103,232,249,0.7), 0 0 36px rgba(139,92,246,0.5), 0 0 72px rgba(59,130,246,0.35)",
              letterSpacing: "0.14em",
            }}
          >
            AI
          </span>
        </div>
      </div>
    </div>
  );
}
