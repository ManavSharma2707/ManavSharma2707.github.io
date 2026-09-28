import { useCallback, useEffect, useState } from "react";

function readParam(key: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  return new URLSearchParams(window.location.search).get(key) ?? fallback;
}

/** Reads and writes a single query-string param, so a view/range can be deep-linked from the README. */
export function useUrlState(key: string, fallback: string): [string, (value: string) => void] {
  const [value, setValue] = useState(() => readParam(key, fallback));

  useEffect(() => {
    const onPopState = () => setValue(readParam(key, fallback));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [key, fallback]);

  const update = useCallback(
    (next: string) => {
      const url = new URL(window.location.href);
      url.searchParams.set(key, next);
      window.history.replaceState({}, "", url);
      setValue(next);
    },
    [key],
  );

  return [value, update];
}
