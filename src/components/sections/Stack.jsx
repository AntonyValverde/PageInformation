import { AnimatePresence, m } from "motion/react";
import { useMemo, useState } from "react";
import { stack, stackCategories } from "../../data/stack";
import { Card } from "../ui/Card";
import { FilterChips } from "../ui/FilterChips";
import { Reveal } from "../ui/Reveal";
import { Section, SectionHeading } from "../ui/Section";

function Marquee({ items, reverse }) {
  const doubled = [...items, ...items];
  return (
    <div className="mask-fade-x group flex overflow-hidden">
      <ul
        aria-hidden="true"
        className={`flex w-max shrink-0 gap-3 pr-3 ${reverse ? "animate-marquee-reverse" : "animate-marquee"} can-hover:group-hover:[animation-play-state:paused]`}
      >
        {doubled.map(({ name, Icon, color }, i) => (
          <li
            key={`${name}-${i}`}
            className="flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2.5 text-sm whitespace-nowrap text-muted"
          >
            <Icon style={{ color }} className="size-4" />
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Stack() {
  const [category, setCategory] = useState("all");

  const options = useMemo(
    () =>
      stackCategories.map((c) => ({
        ...c,
        count: c.id === "all" ? stack.length : stack.filter((s) => s.category === c.id).length,
      })),
    [],
  );
  const visible = category === "all" ? stack : stack.filter((s) => s.category === category);
  const half = Math.ceil(stack.length / 2);

  return (
    <Section id="stack">
      <SectionHeading
        id="stack"
        index="02"
        label="Stack técnico"
        title="Herramientas con las que"
        highlight="construyo."
        subtitle="Lenguajes, frameworks, bases de datos y herramientas que uso en mis proyectos."
      />

      <Reveal className="mb-8">
        <FilterChips options={options} value={category} onChange={setCategory} layoutId="stack-filter" label="Filtrar por categoría" />
      </Reveal>

      <m.ul layout className="grid grid-cols-3 gap-2.5 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map(({ name, Icon, color }) => (
            <m.li
              key={name}
              layout
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="group flex h-24 flex-col items-center justify-center gap-2.5 p-2 sm:h-32 sm:gap-3 sm:p-4" style={{ "--brand": color }}>
                <Icon
                  aria-hidden="true"
                  className="size-7 text-muted transition-all duration-500 sm:size-10 can-hover:group-hover:scale-110 can-hover:group-hover:text-[var(--brand)] can-hover:group-hover:drop-shadow-[0_0_18px_var(--brand)]"
                />
                <span className="text-xs font-medium text-fg sm:text-sm">{name}</span>
              </Card>
            </m.li>
          ))}
        </AnimatePresence>
      </m.ul>

      <Reveal className="mt-16 flex flex-col gap-3" delay={0.1}>
        <Marquee items={stack.slice(0, half)} />
        <Marquee items={stack.slice(half)} reverse />
      </Reveal>
    </Section>
  );
}
