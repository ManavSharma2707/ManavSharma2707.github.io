import { motion } from "framer-motion";
import { Panel } from "./layout/Panel";
import type { Metrics } from "../types/metrics";

interface StreakRingProps {
  streak: Metrics["streak"];
}

export function StreakRing({ streak }: StreakRingProps) {
  const size = 140;
  const cx = size / 2;
  const cy = size * 0.42;
  const r = size * 0.3;
  const strokeWidth = size * 0.06;
  const circumference = 2 * Math.PI * r;
  const ratio = streak.longest > 0 ? Math.min(streak.current / streak.longest, 1) : 0;

  return (
    <Panel label="Streak">
      <div className="flex justify-center">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Contribution streak">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#2A2F37" strokeWidth={strokeWidth} opacity={0.4} />
          <motion.circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#35D6E8"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference * (1 - ratio) }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          />
          <text x={cx} y={cy - 2} textAnchor="middle" className="fill-gold-light font-mono text-[28px] font-semibold">
            {streak.current}
          </text>
          <text x={cx} y={cy + 18} textAnchor="middle" className="fill-ink-muted font-display text-[11px] tracking-widest">
            DAY STREAK
          </text>
          <text x={cx} y={cy + r + 24} textAnchor="middle" className="fill-ink-muted font-body text-[10px]">
            Longest: {streak.longest}
          </text>
        </svg>
      </div>
    </Panel>
  );
}
