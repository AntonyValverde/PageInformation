import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FaBuildingColumns, FaLocationDot } from "react-icons/fa6";
import { certificates } from "../../data/certificates";
import { degrees } from "../../data/education";
import { profile } from "../../data/profile";
import { stack } from "../../data/stack";
import { Card } from "../ui/Card";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { Section, SectionHeading } from "../ui/Section";

function Counter({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || value == null) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <span ref={ref} className="text-gradient tabular-nums">
      {value == null ? "—" : display}
    </span>
  );
}

export function About({ repos, loading }) {
  const stats = [
    { label: "Proyectos publicados en GitHub", value: loading ? null : repos.length },
    { label: "Demos funcionando en vivo", value: loading ? null : repos.filter((r) => r.homepage).length },
    { label: "Títulos y certificaciones", value: degrees.length + certificates.length },
    { label: "Tecnologías en mi stack", value: stack.length },
  ];

  return (
    <Section id="sobre-mi">
      <SectionHeading id="sobre-mi" index="01" label="Sobre mí" title="Del análisis al" highlight="producto final." />

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          {profile.longBio.map((p, i) => (
            <Reveal key={i} as="p" delay={i * 0.1} className="text-body mb-6 text-muted text-pretty first:text-fg first:text-lg sm:first:text-xl">
              {p}
            </Reveal>
          ))}

          <Reveal delay={0.2} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6">
            <span className="flex items-center gap-3 text-sm text-muted">
              <span className="grid size-9 place-items-center rounded-full border border-line text-accent-soft">
                <FaBuildingColumns size={14} aria-hidden="true" />
              </span>
              {profile.university}
            </span>
            <span className="flex items-center gap-3 text-sm text-muted">
              <span className="grid size-9 place-items-center rounded-full border border-line text-accent-soft">
                <FaLocationDot size={14} aria-hidden="true" />
              </span>
              {profile.location}
            </span>
          </Reveal>
        </div>

        <RevealGroup as="ul" className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-5">
          {stats.map((s) => (
            <RevealItem as="li" key={s.label}>
              <Card className="flex h-full flex-col justify-between gap-6 p-5 sm:p-6">
                <p className="font-display text-[clamp(2.5rem,1.5rem+3vw,3.75rem)] leading-none font-semibold tracking-tight">
                  <Counter value={s.value} />
                </p>
                <p className="text-sm leading-snug text-muted">{s.label}</p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
