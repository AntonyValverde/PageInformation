import clsx from "clsx";
import { AnimatePresence, m } from "motion/react";
import { useMemo, useState } from "react";
import { FaArrowRight, FaArrowUpRightFromSquare, FaGithub, FaRotateRight, FaStar } from "react-icons/fa6";
import { profile } from "../../data/profile";
import { projectPreviews } from "../../data/projects";
import { relativeTime } from "../../lib/format";
import { languageColor } from "../../lib/languageColors";
import { Button } from "../ui/Button";
import { TiltCard } from "../ui/Card";
import { FilterChips } from "../ui/FilterChips";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { Section, SectionHeading } from "../ui/Section";

const PAGE = 6;

function LanguageTag({ language }) {
  if (!language) return null;
  return (
    <span className="flex items-center gap-1.5 text-xs text-muted">
      <span aria-hidden="true" className="size-2.5 rounded-full" style={{ backgroundColor: languageColor(language) }} />
      {language}
    </span>
  );
}

function ProjectLinks({ project, size = "sm" }) {
  const cls =
    "grid size-11 place-items-center rounded-full border border-line text-muted transition-colors duration-300 can-hover:hover:border-line-strong can-hover:hover:text-fg";
  return (
    <div className="relative z-10 flex gap-2">
      <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Código de ${project.title} en GitHub`} className={cls}>
        <FaGithub size={size === "sm" ? 16 : 18} aria-hidden="true" />
      </a>
      {project.homepage && (
        <a href={project.homepage} target="_blank" rel="noopener noreferrer" aria-label={`Demo en vivo de ${project.title}`} className={cls}>
          <FaArrowUpRightFromSquare size={size === "sm" ? 14 : 16} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

// Vista previa: captura real si existe, si no un patrón generativo con el nombre.
function Preview({ project, compact = false }) {
  const src = projectPreviews[project.name];
  return (
    <div
      className={clsx(
        "relative overflow-hidden border border-line bg-elevated",
        compact ? "aspect-[16/9] rounded-[calc(var(--radius-md)-8px)]" : "aspect-[16/10] rounded-[calc(var(--radius-md)-6px)]",
      )}
    >
      {src ? (
        <img
          src={src}
          alt={compact ? "" : `Vista previa de ${project.title}`}
          loading="lazy"
          decoding="async"
          width="960"
          height="600"
          className="size-full object-cover object-top transition-transform duration-700 ease-[var(--ease-out-expo)] can-hover:group-hover:scale-[1.04]"
        />
      ) : (
        <div className="grid size-full place-items-center bg-[radial-gradient(circle_at_30%_20%,rgb(var(--accent-rgb)/0.35),transparent_60%),radial-gradient(circle_at_80%_90%,rgb(var(--accent-2-rgb)/0.3),transparent_55%)]">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: "linear-gradient(rgb(var(--fg-rgb)/0.08) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--fg-rgb)/0.08) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <span
            className={clsx(
              "relative px-6 text-center font-display font-semibold tracking-tight text-fg/80",
              compact ? "text-xl" : "text-3xl",
            )}
          >
            {project.title}
          </span>
        </div>
      )}
      {/* Barra de navegador falsa */}
      {!compact && (
        <div className="absolute inset-x-0 top-0 flex h-7 items-center gap-1.5 bg-gradient-to-b from-black/50 to-transparent px-3">
          <span className="size-2 rounded-full bg-[#ff5f57]" />
          <span className="size-2 rounded-full bg-[#febc2e]" />
          <span className="size-2 rounded-full bg-[#28c840]" />
        </div>
      )}
    </div>
  );
}

function FeaturedProject({ project, index }) {
  const reversed = index % 2 === 1;
  return (
    <RevealItem>
      <TiltCard max={3} className="gradient-border group rounded-[var(--radius-lg)] p-3 sm:p-4">
        <article className={clsx("grid items-center gap-6 lg:grid-cols-2 lg:gap-10", reversed && "lg:[&>*:first-child]:order-2")}>
          <a
            href={project.homepage || project.url}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
            aria-hidden="true"
          >
            <Preview project={project} />
          </a>
          <div className="flex flex-col gap-4 px-2 pb-3 sm:px-3 lg:py-6 lg:pr-8">
            <div className="flex items-center gap-3">
              <span className="text-label text-accent-soft">Destacado 0{index + 1}</span>
              <span aria-hidden="true" className="h-px flex-1 bg-line" />
              <LanguageTag language={project.language} />
            </div>
            <h3 className="text-h2">{project.title}</h3>
            <p className="text-body text-muted text-pretty">{project.description}</p>
            {project.topics.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {project.topics.map((t) => (
                  <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">
                    {t}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-2 flex flex-wrap items-center gap-3">
              {project.homepage && (
                <Button href={project.homepage} size="sm" className="group/btn">
                  Ver demo
                  <FaArrowUpRightFromSquare size={12} className="transition-transform duration-300 can-hover:group-hover/btn:-translate-y-0.5 can-hover:group-hover/btn:translate-x-0.5" />
                </Button>
              )}
              <Button href={project.url} size="sm" variant="secondary">
                <FaGithub size={15} /> Código
              </Button>
              <span className="ml-auto text-xs text-muted">Actualizado {relativeTime(project.updatedAt)}</span>
            </div>
          </div>
        </article>
      </TiltCard>
    </RevealItem>
  );
}

function ProjectCard({ project }) {
  return (
    <TiltCard className="group flex h-full flex-col p-6">
      <div className="relative -mx-3 -mt-3 mb-6">
        <Preview project={project} compact />
        <div className="absolute top-3 right-3 [&_a]:bg-bg/70 [&_a]:backdrop-blur-md">
          <ProjectLinks project={project} />
        </div>
      </div>
      <h3 className="text-h3 mb-2">
        <a href={project.homepage || project.url} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0 after:content-['']">
          {project.title}
        </a>
      </h3>
      <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-muted">{project.description}</p>
      {project.topics.length > 0 && (
        <ul className="mb-6 flex flex-wrap gap-1.5">
          {project.topics.slice(0, 4).map((t) => (
            <li key={t} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.7rem] text-muted">
              {t}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-auto flex items-center gap-4 border-t border-line pt-4">
        <LanguageTag language={project.language} />
        {project.stars > 0 && (
          <span className="flex items-center gap-1 text-xs text-muted">
            <FaStar aria-hidden="true" className="text-[#e3b341]" /> {project.stars}
          </span>
        )}
        <span className="ml-auto text-xs text-muted">{relativeTime(project.updatedAt)}</span>
      </div>
    </TiltCard>
  );
}

function SkeletonCard() {
  return (
    <div className="glass relative h-64 overflow-hidden rounded-[var(--radius-md)] p-6" aria-hidden="true">
      <div className="mb-8 flex justify-between">
        <div className="size-12 rounded-2xl bg-surface-hover" />
        <div className="size-11 rounded-full bg-surface-hover" />
      </div>
      <div className="mb-3 h-5 w-2/3 rounded bg-surface-hover" />
      <div className="mb-2 h-3 w-full rounded bg-surface-hover" />
      <div className="h-3 w-4/5 rounded bg-surface-hover" />
      <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-[rgb(var(--fg-rgb)/0.06)] to-transparent" />
    </div>
  );
}

export function Projects({ repos, loading, error, retry }) {
  const [language, setLanguage] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE);

  const featured = repos.filter((r) => r.featured);
  const rest = repos.filter((r) => !r.featured);

  const options = useMemo(() => {
    const counts = new Map();
    rest.forEach((r) => r.language && counts.set(r.language, (counts.get(r.language) ?? 0) + 1));
    return [
      { id: "all", label: "Todos", count: rest.length },
      ...[...counts.entries()].sort((a, b) => b[1] - a[1]).map(([id, count]) => ({ id, label: id, count })),
    ];
  }, [rest]);

  const filtered = language === "all" ? rest : rest.filter((r) => r.language === language);
  const shown = filtered.slice(0, visibleCount);

  return (
    <Section id="proyectos">
      <SectionHeading
        id="proyectos"
        index="04"
        label="Proyectos"
        title="Trabajo publicado y"
        highlight="funcionando."
        subtitle="Proyectos sincronizados en vivo desde mi GitHub. La mayoría tienen una demo que puedes probar ahora mismo."
      />

      {loading && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" role="status" aria-label="Cargando proyectos">
          {Array.from({ length: 6 }, (_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {!loading && error && (
        <Reveal className="glass mx-auto flex max-w-lg flex-col items-center gap-5 rounded-[var(--radius-lg)] p-10 text-center">
          <p className="text-h3">No pude cargar los proyectos</p>
          <p className="text-sm text-muted">{error}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={retry} size="sm">
              <FaRotateRight size={13} /> Reintentar
            </Button>
            <Button href={`https://github.com/${profile.githubUser}`} size="sm" variant="secondary">
              <FaGithub size={15} /> Ver en GitHub
            </Button>
          </div>
        </Reveal>
      )}

      {!loading && !error && repos.length === 0 && (
        <p className="text-center text-muted">Aún no hay proyectos públicos para mostrar.</p>
      )}

      {!loading && !error && repos.length > 0 && (
        <>
          {featured.length > 0 && (
            <RevealGroup className="mb-20 flex flex-col gap-6 lg:gap-8" amount={0.05}>
              {featured.map((p, i) => (
                <FeaturedProject key={p.id} project={p} index={i} />
              ))}
            </RevealGroup>
          )}

          {rest.length > 0 && (
            <>
              <Reveal className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <h3 className="text-h3">Más proyectos</h3>
                {options.length > 2 && (
                  <FilterChips
                    options={options}
                    value={language}
                    onChange={(v) => {
                      setLanguage(v);
                      setVisibleCount(PAGE);
                    }}
                    layoutId="project-filter"
                    label="Filtrar por lenguaje"
                  />
                )}
              </Reveal>

              <m.ul layout className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout" initial={false}>
                  {shown.map((p, i) => (
                    <m.li
                      key={p.id}
                      layout
                      className="relative"
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, delay: (i % PAGE) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <ProjectCard project={p} />
                    </m.li>
                  ))}
                </AnimatePresence>
              </m.ul>

              <div className="mt-12 flex flex-wrap justify-center gap-3">
                {filtered.length > visibleCount && (
                  <Button variant="secondary" onClick={() => setVisibleCount((n) => n + PAGE)}>
                    Ver más proyectos ({filtered.length - visibleCount})
                  </Button>
                )}
                <Button href={`https://github.com/${profile.githubUser}?tab=repositories`} variant="ghost" className="group">
                  Ver todo en GitHub
                  <FaArrowRight className="transition-transform duration-300 can-hover:group-hover:translate-x-1" />
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </Section>
  );
}
