import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Star, GitFork, ExternalLink } from "lucide-react";
import { SectionHeader } from "@/components/visual/SectionHeader";
import { GlassCard } from "@/components/visual/GlassCard";
import { profile } from "@/data/profile";

type Repo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
};

const languageColor: Record<string, string> = {
  Python: "bg-yellow-400",
  TypeScript: "bg-electric",
  JavaScript: "bg-yellow-300",
  Jupyter: "bg-orange-400",
  Java: "bg-red-400",
  "C++": "bg-pink-400",
  HTML: "bg-orange-500",
  CSS: "bg-blue-400",
};

export function GitHubSection() {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(
      `https://api.github.com/users/${profile.githubUsername}/repos?sort=updated&per_page=6`,
    )
      .then((r) => {
        if (!r.ok) throw new Error(`GitHub API ${r.status}`);
        return r.json();
      })
      .then((data: Repo[]) => {
        if (!cancelled) setRepos(data);
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="github" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader
            eyebrow="GitHub"
            title="Latest open-source activity"
            description="Live feed from GitHub showing recent repositories."
          />
          <a
            href={profile.social.github}
            target="_blank"
            rel="noreferrer"
            className="glass inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10"
          >
            <Github className="h-4 w-4" /> @{profile.githubUsername}
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* Contribution graph placeholder */}
        <GlassCard className="mt-10 p-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-mono">contribution activity</span>
            <span>last 12 months</span>
          </div>
          <div className="mt-4 grid grid-cols-[repeat(52,minmax(0,1fr))] gap-[3px]">
            {Array.from({ length: 52 * 7 }).map((_, i) => {
              // Deterministic pseudo-noise so SSR/client agree.
              const n = Math.sin(i * 12.9898) * 43758.5453;
              const intensity = n - Math.floor(n);
              const cls =
                intensity > 0.85
                  ? "bg-electric/90"
                  : intensity > 0.65
                    ? "bg-electric/60"
                    : intensity > 0.4
                      ? "bg-electric/30"
                      : intensity > 0.2
                        ? "bg-electric/15"
                        : "bg-white/[0.04]";
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-[2px] ${cls}`}
                  aria-hidden
                />
              );
            })}
          </div>
        </GlassCard>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {error && (
            <GlassCard className="p-6 sm:col-span-2 lg:col-span-3">
              <p className="text-sm text-muted-foreground">
                Couldn't load repositories right now. Check{" "}
                <a
                  href={profile.social.github}
                  className="text-electric underline-offset-4 hover:underline"
                >
                  GitHub
                </a>{" "}
                directly.
              </p>
            </GlassCard>
          )}
          {!repos &&
            !error &&
            Array.from({ length: 6 }).map((_, i) => (
              <GlassCard key={i} className="h-44 animate-pulse p-6">
                <div className="h-4 w-32 rounded bg-white/10" />
                <div className="mt-3 h-3 w-full rounded bg-white/5" />
                <div className="mt-2 h-3 w-2/3 rounded bg-white/5" />
              </GlassCard>
            ))}
          {repos?.map((repo, i) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
            >
              <GlassCard interactive className="h-full p-6">
                <h3 className="font-mono text-sm font-semibold text-electric">
                  {repo.name}
                </h3>
                <p className="mt-2 line-clamp-3 text-xs text-muted-foreground">
                  {repo.description ?? "No description provided."}
                </p>
                <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          languageColor[repo.language] ?? "bg-muted-foreground"
                        }`}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3" /> {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="h-3 w-3" /> {repo.forks_count}
                  </span>
                </div>
              </GlassCard>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
