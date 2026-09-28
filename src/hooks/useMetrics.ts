import { useEffect, useState } from "react";
import type { Metrics } from "../types/metrics";

interface MetricsState {
  metrics: Metrics | null;
  loading: boolean;
  error: string | null;
}

export function useMetrics(): MetricsState {
  const [state, setState] = useState<MetricsState>({ metrics: null, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;

    fetch(`${import.meta.env.BASE_URL}metrics.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`metrics.json request failed: ${res.status}`);
        return res.json() as Promise<Metrics>;
      })
      .then((metrics) => {
        if (!cancelled) setState({ metrics, loading: false, error: null });
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({ metrics: null, loading: false, error: error instanceof Error ? error.message : String(error) });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
