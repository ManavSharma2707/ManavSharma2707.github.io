import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  label: string;
  value: number;
  formatted?: string;
  delta?: string;
}

function useCountUp(target: number, durationMs = 800): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  return value;
}

export function StatCard({ label, value, formatted, delta }: StatCardProps) {
  const displayed = useCountUp(value);
  const deltaPositive = !delta?.startsWith("-");

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded border border-line-subtle bg-bg-panel/80 px-3 py-4 text-center"
    >
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gold" />
      <p className="mb-2 font-display text-[10px] uppercase tracking-[0.14em] text-gold">{label}</p>
      <p className="font-mono text-2xl font-medium text-ink-primary sm:text-3xl">{formatted ?? displayed}</p>
      {delta && (
        <p className={`mt-1 font-mono text-[11px] ${deltaPositive ? "text-data-cyan" : "text-ink-muted"}`}>{delta}</p>
      )}
    </motion.div>
  );
}
