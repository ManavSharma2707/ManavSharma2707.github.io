import { Linkedin, Mail, Github } from "lucide-react";

interface ContactBarProps {
  login: string;
}

export function ContactBar({ login }: ContactBarProps) {
  return (
    <footer id="contact" className="mt-12 border-t border-line-subtle pt-8 text-center">
      <p className="mb-4 font-display text-sm uppercase tracking-[0.2em] text-gold">Contact</p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          href={`https://github.com/${login}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded border border-line-subtle px-4 py-2 text-sm text-ink-muted transition-colors hover:border-gold hover:text-gold"
        >
          <Github size={16} /> GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/manav-sharma-ab750432a"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded border border-line-subtle px-4 py-2 text-sm text-ink-muted transition-colors hover:border-gold hover:text-gold"
        >
          <Linkedin size={16} /> LinkedIn
        </a>
        <a
          href="mailto:manav2707sharma@gmail.com"
          className="flex items-center gap-2 rounded border border-line-subtle px-4 py-2 text-sm text-ink-muted transition-colors hover:border-gold hover:text-gold"
        >
          <Mail size={16} /> Email
        </a>
      </div>
      <p className="mt-6 font-mono text-[11px] text-ink-muted">Metrics refresh daily from GitHub Actions.</p>
    </footer>
  );
}
