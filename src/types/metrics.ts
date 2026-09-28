export interface Metrics {
  generatedAt: string;
  profile: {
    login: string;
    name: string;
    title: string;
    avatarUrl: string;
    location: string | null;
    followers: number;
  };
  totals: {
    repositories: number;
    stars: number;
    forks: number;
    commitsThisYear: number;
    pullRequests: number;
    issues: number;
    reviews: number;
    contributionsThisYear: number;
  };
  streak: {
    current: number;
    longest: number;
    currentStart: string | null;
    longestRange: [string, string] | null;
  };
  calendar: Array<{ date: string; count: number; level: number }>;
  monthlyCommits: Array<{ month: string; count: number }>;
  languages: Array<{ name: string; percent: number; color: string }>;
  weeklyRhythm: number[][];
  projects: Array<{
    name: string;
    owner: string;
    description: string | null;
    stars: number;
    forks: number;
    language: string | null;
    url: string;
    topics: string[];
  }>;
  trends: { starsDelta30d: number; commitsDelta30d: number; mergedPrRate: number };
}
