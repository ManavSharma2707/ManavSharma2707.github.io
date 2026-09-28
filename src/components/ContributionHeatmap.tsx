import { useState } from "react";
import { Panel } from "./layout/Panel";
import type { Metrics } from "../types/metrics";

interface ContributionHeatmapProps {
  calendar: Metrics["calendar"];
}

const SCALE = ["#1A1F26", "#134A52", "#1C7E88", "#35D6E8", "#E8CD7E"];

export function ContributionHeatmap({ calendar }: ContributionHeatmapProps) {
  const scale = SCALE;
  const [hovered, setHovered] = useState<{ date: string; count: number } | null>(null);

  const weeks: Metrics["calendar"][] = [];
  for (let i = 0; i < calendar.length; i += 7) weeks.push(calendar.slice(i, i + 7));

  return (
    <Panel label="Contributions">
      <div className="mb-2 flex items-center gap-2 text-[11px] text-ink-muted">
        <span className="font-display uppercase tracking-wider">Less</span>
        {scale.map((c) => (
          <span key={c} className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: c }} />
        ))}
        <span className="font-display uppercase tracking-wider">More</span>
        <span className="ml-auto font-mono text-ink-muted">
          {hovered ? `${hovered.date}: ${hovered.count} contributions` : " "}
        </span>
      </div>
      <div className="flex gap-[2px] overflow-x-auto pb-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[2px]">
            {week.map((day) => (
              <button
                key={day.date}
                type="button"
                aria-label={`${day.date}: ${day.count} contributions`}
                onMouseEnter={() => setHovered(day)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(day)}
                onBlur={() => setHovered(null)}
                className="h-[10px] w-[10px] rounded-[2px] transition-transform hover:scale-125"
                style={{ backgroundColor: scale[day.level] ?? scale[0] }}
              />
            ))}
          </div>
        ))}
      </div>
    </Panel>
  );
}
