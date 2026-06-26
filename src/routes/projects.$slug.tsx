import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Github, FileText } from "lucide-react";
import { GlassCard } from "@/components/visual/GlassCard";
import { getProjectBySlug, projects, type Project } from "@/data/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }): { project: Project } => {
    const project = getProjectBySlug(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.project.title ?? "Project"} — Nabh Jain` },
      {
        name: "description",
        content: loaderData?.project.tagline ?? "Project case study",
      },
      {
        property: "og:title",
        content: loaderData?.project.title ?? "Project",
      },
      {
        property: "og:description",
        content: loaderData?.project.tagline ?? "",
      },
    ],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-display text-2xl">Project not found</h1>
        <Link to="/projects" className="mt-4 inline-block text-electric">
          ← Back to projects
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <h1 className="font-display text-xl">Couldn't load this project</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={reset}
          className="mt-4 rounded-lg bg-electric px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          Try again
        </button>
      </div>
    </div>
  ),
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { project } = Route.useLoaderData() as { project: Project };
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <div className="pt-32 pb-12">
      <article className="mx-auto max-w-4xl px-4">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-electric"
        >
          <ArrowLeft className="h-4 w-4" /> All projects
        </Link>

        <header className="mt-6">
          <p className="font-mono text-xs uppercase tracking-wider text-electric">
            {project.category} · {project.period}
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{project.tagline}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-electric to-purple px-4 py-2 text-sm font-semibold text-primary-foreground hover:shadow-glow"
              >
                <ExternalLink className="h-4 w-4" /> Live demo
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="glass inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold hover:bg-white/10"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            )}
            {project.links.docs && (
              <a
                href={project.links.docs}
                target="_blank"
                rel="noreferrer"
                className="glass inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold hover:bg-white/10"
              >
                <FileText className="h-4 w-4" /> Documentation
              </a>
            )}
          </div>
        </header>

        {/* Hero placeholder */}
        <GlassCard className="mt-10 aspect-[16/9] overflow-hidden">
          <div className="grid h-full place-items-center bg-gradient-to-br from-electric/10 to-purple/10">
            <div className="text-center">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Screenshot placeholder
              </p>
              <p className="mt-2 font-display text-2xl text-gradient">
                {project.title}
              </p>
            </div>
          </div>
        </GlassCard>

        <Section title="Overview" body={project.overview} />
        <Section title="Problem statement" body={project.problem} />

        <h2 className="mt-12 font-display text-2xl font-semibold tracking-tight">
          Architecture
        </h2>
        <GlassCard className="mt-4 p-6">
          <ol className="space-y-3">
            {project.architecture.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-gradient-to-br from-electric to-purple font-mono text-[11px] font-semibold text-primary-foreground">
                  {i + 1}
                </span>
                <span className="text-foreground/90">{step}</span>
              </li>
            ))}
          </ol>
        </GlassCard>

        <ListSection title="Features" items={project.features} />
        <ListSection title="Challenges" items={project.challenges} />
        <ListSection title="Results" items={project.results} />

        <h2 className="mt-12 font-display text-2xl font-semibold tracking-tight">
          Tech stack
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((t) => (
            <span
              key={t}
              className="glass rounded-lg px-3 py-1.5 font-mono text-xs"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Next project
          </p>
          <Link
            to="/projects/$slug"
            params={{ slug: next.slug }}
            className="mt-2 inline-block font-display text-2xl font-semibold tracking-tight transition-colors hover:text-electric"
          >
            {next.title} →
          </Link>
        </div>
      </article>
    </div>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      <p className="mt-3 text-base leading-relaxed text-foreground/90">{body}</p>
    </section>
  );
}

function ListSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      <ul className="mt-4 space-y-2">
        {items.map((item, i) => (
          <li key={i} className="glass flex gap-3 rounded-xl p-4 text-sm">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-electric" />
            <span className="text-foreground/90">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
