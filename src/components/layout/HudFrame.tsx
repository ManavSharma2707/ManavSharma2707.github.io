import type { ReactNode } from "react";
import { bevelledRectPath } from "../../lib/svgPaths";

interface HudFrameProps {
  children: ReactNode;
}

const FRAME_A = "#8E1020";
const FRAME_B = "#5A0A14";
const GOLD = "#C9A54A";
const GOLD_LIGHT = "#E8CD7E";

/** The full-viewport bevelled HUD frame: a filled crimson plate band with gold trim. Dark by design. */
export function HudFrame({ children }: HudFrameProps) {
  return (
    <div className="relative min-h-screen w-full bg-bg-base transition-colors">
      <svg
        className="pointer-events-none fixed inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hud-frame-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={FRAME_A} />
            <stop offset="1" stopColor={FRAME_B} />
          </linearGradient>
        </defs>
        <path
          d={`${bevelledRectPath(0, 0, 100, 100, 3)} ${bevelledRectPath(1.6, 1.6, 96.8, 96.8, 2)}`}
          fill="url(#hud-frame-grad)"
          fillRule="evenodd"
        />
        <path d={bevelledRectPath(2.2, 2.2, 95.6, 95.6, 1.6)} fill="none" stroke={GOLD} strokeWidth="0.15" opacity="0.9" />
      </svg>
      <div className="pointer-events-none fixed left-1/2 top-0 h-1 w-24 -translate-x-1/2" style={{ backgroundColor: GOLD_LIGHT }} />
      <div className="pointer-events-none fixed bottom-0 left-1/2 h-1 w-24 -translate-x-1/2" style={{ backgroundColor: GOLD_LIGHT }} />
      <div className="relative mx-auto max-w-6xl px-6 py-10 sm:px-10">{children}</div>
    </div>
  );
}
