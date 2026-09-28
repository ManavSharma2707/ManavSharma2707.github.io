import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Panel } from "./layout/Panel";
import type { Metrics } from "../types/metrics";

interface LanguageDonutProps {
  languages: Metrics["languages"];
  selected: string | null;
  onSelect: (name: string | null) => void;
}

export function LanguageDonut({ languages, selected, onSelect }: LanguageDonutProps) {
  return (
    <Panel label="Languages">
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="h-36 w-36 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={languages}
                dataKey="percent"
                nameKey="name"
                innerRadius="65%"
                outerRadius="100%"
                paddingAngle={2}
                onClick={(entry) => onSelect(selected === entry.name ? null : entry.name)}
              >
                {languages.map((lang) => (
                  <Cell
                    key={lang.name}
                    fill={lang.color}
                    opacity={selected && selected !== lang.name ? 0.3 : 1}
                    className="cursor-pointer"
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "#171B21", border: "1px solid #2A2F37", borderRadius: 4, fontSize: 12 }}
                formatter={(value: number, name: string) => [`${value.toFixed(1)}%`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="w-full space-y-1.5">
          {languages.slice(0, 6).map((lang) => (
            <li key={lang.name}>
              <button
                type="button"
                onClick={() => onSelect(selected === lang.name ? null : lang.name)}
                className={`flex w-full items-center justify-between rounded px-1.5 py-0.5 text-sm transition-colors ${
                  selected === lang.name ? "bg-gold/15 text-gold" : "text-ink-primary hover:text-gold"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                  {lang.name}
                </span>
                <span className="font-mono text-xs text-ink-muted">{lang.percent.toFixed(1)}%</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}
