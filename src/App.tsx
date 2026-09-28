import { useEffect, useState } from "react";
import { HudFrame } from "./components/layout/HudFrame";
import { Header } from "./components/Header";
import { StatCard } from "./components/StatCard";
import { ActivityChart } from "./components/ActivityChart";
import { LanguageDonut } from "./components/LanguageDonut";
import { StreakRing } from "./components/StreakRing";
import { WeeklyRhythm } from "./components/WeeklyRhythm";
import { ContributionHeatmap } from "./components/ContributionHeatmap";
import { NetworkGraph } from "./components/NetworkGraph";
import { ProjectShowcase } from "./components/ProjectShowcase";
import { ContactBar } from "./components/ContactBar";
import { useMetrics } from "./hooks/useMetrics";
import { useUrlState } from "./hooks/useUrlState";

const VIEW_SECTIONS: Record<string, string> = {
  overview: "overview",
  activity: "overview",
  languages: "languages",
  projects: "projects",
};

function formatDelta(value: number): string {
  if (value === 0) return "+0";
  return value > 0 ? `+${value}` : String(value);
}

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

export default function App() {
  const { metrics, loading, error } = useMetrics();
  const [view] = useUrlState("view", "overview");
  const [languageFilter, setLanguageFilter] = useState<string | null>(null);

  useEffect(() => {
    const targetId = VIEW_SECTIONS[view];
    if (!targetId) return;
    const el = document.getElementById(targetId);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [view]);

  if (loading) {
    return (
      <HudFrame>
        <p className="py-24 text-center font-mono text-ink-muted">Loading metrics...</p>
      </HudFrame>
    );
  }

  if (error || !metrics) {
    return (
      <HudFrame>
        <p className="py-24 text-center font-mono text-ink-muted">
          Could not load metrics.json. {error ?? "Try refreshing the page."}
        </p>
      </HudFrame>
    );
  }

  return (
    <HudFrame>
      <Header profile={metrics.profile} />

      <section id="overview" className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Repositories" value={metrics.totals.repositories} />
        <StatCard label="Stars" value={metrics.totals.stars} delta={formatDelta(metrics.trends.starsDelta30d)} />
        <StatCard label="Followers" value={metrics.profile.followers} />
        <StatCard label="Commits / yr" value={metrics.totals.commitsThisYear} delta={formatDelta(metrics.trends.commitsDelta30d)} />
        <StatCard
          label="Pull Requests"
          value={metrics.totals.pullRequests}
          delta={`${formatPercent(metrics.trends.mergedPrRate)} merged`}
        />
        <StatCard
          label="Issues / Reviews"
          value={metrics.totals.issues}
          formatted={`${metrics.totals.issues} / ${metrics.totals.reviews}`}
        />
      </section>

      <section className="mb-6 grid gap-4 lg:grid-cols-2">
        <ActivityChart monthlyCommits={metrics.monthlyCommits} />
        <div id="languages">
          <LanguageDonut languages={metrics.languages} selected={languageFilter} onSelect={setLanguageFilter} />
        </div>
      </section>

      <section className="mb-6 grid gap-4 lg:grid-cols-2">
        <StreakRing streak={metrics.streak} />
        <WeeklyRhythm grid={metrics.weeklyRhythm} />
      </section>

      <section className="mb-6">
        <ContributionHeatmap calendar={metrics.calendar} />
      </section>

      <section className="mb-6">
        <NetworkGraph login={metrics.profile.login} projects={metrics.projects} />
      </section>

      <section id="projects" className="mb-6 grid grid-cols-1">
        <ProjectShowcase
          projects={metrics.projects}
          languageFilter={languageFilter}
          onClearFilter={() => setLanguageFilter(null)}
        />
      </section>

      <ContactBar login={metrics.profile.login} />
    </HudFrame>
  );
}
