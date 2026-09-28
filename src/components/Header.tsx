import { FolderGit2, GitPullRequest, CircleDot, MessagesSquare } from "lucide-react";
import { Emblem } from "./Emblem";
import type { Metrics } from "../types/metrics";

interface HeaderProps {
  profile: Metrics["profile"];
}

const NAV_ITEMS = [
  { label: "Repositories", href: "#projects", icon: FolderGit2 },
  { label: "Pull Requests", href: "#overview", icon: GitPullRequest },
  { label: "Issues", href: "#overview", icon: CircleDot },
  { label: "Discussions", href: "#contact", icon: MessagesSquare },
];

export function Header({ profile }: HeaderProps) {
  return (
    <header className="mb-10 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
      <div className="flex items-center gap-4">
        <img
          src={profile.avatarUrl}
          alt={profile.name}
          width={72}
          height={72}
          className="aspect-square rounded-full border-2 border-gold object-cover"
        />
        <div>
          <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-ink-primary sm:text-3xl">
            {profile.name}
          </h1>
          <p className="text-sm text-ink-muted sm:text-base">{profile.title}</p>
          <p className="font-mono text-xs text-data-cyan">@{profile.login}</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <nav className="hidden gap-5 sm:flex" aria-label="Section navigation">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              title={label}
              className="group flex flex-col items-center gap-1 text-ink-muted transition-colors hover:text-gold"
            >
              <Icon size={18} strokeWidth={1.75} />
              <span className="font-display text-[10px] uppercase tracking-wider opacity-0 transition-opacity group-hover:opacity-100">
                {label}
              </span>
            </a>
          ))}
        </nav>

        <Emblem size={72} />
      </div>
    </header>
  );
}
