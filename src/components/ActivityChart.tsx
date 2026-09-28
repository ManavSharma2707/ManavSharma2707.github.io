import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Panel } from "./layout/Panel";
import { useUrlState } from "../hooks/useUrlState";
import type { Metrics } from "../types/metrics";

interface ActivityChartProps {
  monthlyCommits: Metrics["monthlyCommits"];
}

const RANGES = [
  { label: "3M", months: 3 },
  { label: "6M", months: 6 },
  { label: "12M", months: 12 },
];

function monthLabel(iso: string): string {
  const [year, month] = iso.split("-");
  return new Date(Number(year), Number(month) - 1, 1).toLocaleDateString("en-US", { month: "short" });
}

export function ActivityChart({ monthlyCommits }: ActivityChartProps) {
  const [range, setRange] = useUrlState("range", "6M");
  const months = RANGES.find((r) => r.label === range)?.months ?? 6;
  const data = monthlyCommits.slice(-months).map((m) => ({ label: monthLabel(m.month), commits: m.count }));

  return (
    <Panel label="Commit Trend">
      <div className="mb-3 flex justify-end gap-1">
        {RANGES.map((r) => (
          <button
            key={r.label}
            type="button"
            onClick={() => setRange(r.label)}
            className={`rounded px-2 py-0.5 font-mono text-[11px] transition-colors ${
              range === r.label ? "bg-gold/20 text-gold" : "text-ink-muted hover:text-gold"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id="activity-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1C7E88" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#1C7E88" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <XAxis dataKey="label" tick={{ fontSize: 10, fill: "#8B929C" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#8B929C" }} axisLine={false} tickLine={false} width={28} />
            <Tooltip
              contentStyle={{
                background: "#171B21",
                border: "1px solid #2A2F37",
                borderRadius: 4,
                fontSize: 12,
                fontFamily: "JetBrains Mono, monospace",
              }}
              labelStyle={{ color: "#8B929C" }}
              itemStyle={{ color: "#35D6E8" }}
            />
            <Area type="monotone" dataKey="commits" stroke="#35D6E8" strokeWidth={2} fill="url(#activity-fill)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}
