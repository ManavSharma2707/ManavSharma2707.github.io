import type { ReactNode } from "react";

interface HudFrameProps {
  children: ReactNode;
}

/**
 * The bevelled HUD frame: a crimson plate, a gold hairline, then the dark
 * body. Built from nested clip-path layers with pixel-sized bevels, so the
 * corners stay crisp at any page height and the frame scrolls with content.
 */
export function HudFrame({ children }: HudFrameProps) {
  return (
    <div className="min-h-screen bg-[#060708] p-2 sm:p-3">
      <div className="hud-plate relative min-h-[calc(100vh-1.5rem)] p-[10px] sm:p-[14px]">
        <span className="absolute left-1/2 top-0 h-1 w-24 -translate-x-1/2 bg-gold-light" />
        <span className="absolute bottom-0 left-1/2 h-1 w-24 -translate-x-1/2 bg-gold-light" />
        <div className="hud-trim min-h-[calc(100vh-1.5rem-28px)] p-[1.5px]">
          <div className="hud-body relative min-h-[calc(100vh-1.5rem-31px)] overflow-hidden bg-bg-base">
            <div className="hud-grid pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="hud-glow hud-glow-cyan pointer-events-none absolute" aria-hidden="true" />
            <div className="hud-glow hud-glow-crimson pointer-events-none absolute" aria-hidden="true" />
            <div className="hud-scan pointer-events-none absolute inset-x-0" aria-hidden="true" />
            <div className="relative mx-auto max-w-6xl px-5 py-10 sm:px-10">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
