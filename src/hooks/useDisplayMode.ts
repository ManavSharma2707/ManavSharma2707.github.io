import { useEffect, useState } from "react";

export type DisplayMode = "enhanced" | "minimal";

const STORAGE_KEY = "display-mode";

function readStored(): DisplayMode {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "minimal" ? "minimal" : "enhanced";
  } catch {
    return "enhanced";
  }
}

/** Enhanced shows glow and motion; Minimal flattens both for a plainer, formal look. Persisted per browser. */
export function useDisplayMode(): [DisplayMode, (mode: DisplayMode) => void] {
  const [mode, setMode] = useState<DisplayMode>("enhanced");

  useEffect(() => {
    setMode(readStored());
  }, []);

  const update = (next: DisplayMode) => {
    setMode(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage can be unavailable (private browsing, blocked); the toggle still works for this visit
    }
  };

  return [mode, update];
}
