import { motion } from "framer-motion";
import { Star, GitFork } from "lucide-react";
import { Panel } from "./layout/Panel";
import type { Metrics } from "../types/metrics";

interface ProjectShowcaseProps {
  projects: Metrics["projects"];
  languageFilter: string | null;
  onClearFilter: () => void;
}

export function ProjectShowcase({ projects, languageFilter, onClearFilter }: ProjectShowcaseProps) {
  const visible = languageFilter ? projects.filter((p) => p.language === languageFilter) : projects;

  return (
    <Panel label="Selected Work" className="col-span-full">
      {languageFilter && (
        <button
          type="button"
          onClick={onClearFilter}
          className="mb-3 rounded border border-gold/40 px-2 py-1 font-mono text-[11px] text-gold transition-colors hover:bg-gold/10"
        >
          Filtered by {languageFilter}, clear
        </button>
      )}
      {visible.length === 0 && (
        <p className="py-6 text-center text-sm text-ink-muted">No featured projects use {languageFilter}.</p>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        {visible.map((project) => (
          <motion.a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2 }}
            className="group relative rounded border border-line-subtle bg-bg-panelAlt/60 p-4 transition-colors hover:border-gold/50"
          >
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gold opacity-70" />
            <h4 className="font-display text-base font-semibold text-ink-primary group-hover:text-gold">
              {project.name}
            </h4>
            <p className="mt-1 text-sm text-ink-muted">{project.description ?? "No description provided."}</p>
            <div className="mt-3 flex items-center justify-between text-xs text-ink-muted">
              <span className="flex items-center gap-1">
                {project.language && (
                  <>
                    <span className="h-2 w-2 rounded-full bg-data-cyan" />
                    {project.language}
                  </>
                )}
              </span>
              <span className="flex items-center gap-3 font-mono">
                <span className="flex items-center gap-1">
                  <Star size={12} /> {project.stars}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork size={12} /> {project.forks}
                </span>
              </span>
            </div>
            {project.topics.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.topics.slice(0, 4).map((topic) => (
                  <span key={topic} className="rounded bg-data-cyan/10 px-1.5 py-0.5 font-mono text-[10px] text-data-cyan">
                    #{topic}
                  </span>
                ))}
              </div>
            )}
          </motion.a>
        ))}
      </div>
    </Panel>
  );
}
