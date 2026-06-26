/**
 * Ambient background — Linear/Vercel-style restrained.
 * Single top-anchored radial glow + faint grid + edge vignette.
 */
export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* Subtle grid only at top */}
      <div className="absolute inset-0 grid-bg" />

      {/* Single soft electric glow, top-center — the Linear move */}
      <div
        className="absolute left-1/2 top-[-30%] h-[720px] w-[1100px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.72 0.16 245 / 0.18), transparent 70%)",
        }}
      />

      {/* Edge vignette to anchor content */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,var(--color-background)_100%)]" />
    </div>
  );
}
