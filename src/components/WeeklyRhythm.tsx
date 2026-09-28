import { useState } from "react";
import { Panel } from "./layout/Panel";

interface WeeklyRhythmProps {
  grid: number[][];
}

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const scale = ["#1A1F26", "#134A52", "#1C7E88", "#35D6E8", "#E8CD7E"];

export function WeeklyRhythm({ grid }: WeeklyRhythmProps) {
  const [hovered, setHovered] = useState<{ day: string; hour: number; value: number } | null>(null);
  const max = Math.max(1, ...grid.flat());

  return (
    <Panel label="Weekly Rhythm">
      <p className="mb-2 h-4 font-mono text-[11px] text-ink-muted">
        {hovered ? `${hovered.day} ${hovered.hour}:00, ${hovered.value} commits` : " "}
      </p>
      <div className="space-y-[2px]">
        {grid.map((row, ri) => (
          <div key={ri} className="flex items-center gap-[2px]">
            <span className="w-8 shrink-0 font-display text-[9px] text-ink-muted">{DAY_LABELS[ri]}</span>
            {row.map((value, hi) => {
              const ratio = value / max;
              const level = ratio === 0 ? 0 : ratio > 0.75 ? 4 : ratio > 0.5 ? 3 : ratio > 0.25 ? 2 : 1;
              return (
                <button
                  key={hi}
                  type="button"
                  aria-label={`${DAY_LABELS[ri]} ${hi}:00, ${value} commits`}
                  onMouseEnter={() => setHovered({ day: DAY_LABELS[ri] ?? "", hour: hi, value })}
                  onMouseLeave={() => setHovered(null)}
                  className="h-[9px] flex-1 rounded-[1px] transition-transform hover:scale-125"
                  style={{ backgroundColor: scale[level] }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </Panel>
  );
}
