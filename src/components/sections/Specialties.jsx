import clsx from "clsx";
import { skills } from "../../data/skills";
import { Card } from "../ui/Card";
import { RevealGroup, RevealItem } from "../ui/Reveal";
import { Section, SectionHeading } from "../ui/Section";

// Posición de cada celda en el bento (índice → clases)
const layout = {
  0: "md:col-span-2 lg:row-span-2",
  1: "lg:col-span-2",
  2: "lg:col-span-2",
  9: "md:col-span-2",
};

export function Specialties() {
  return (
    <Section id="especialidades">
      <SectionHeading
        id="especialidades"
        index="03"
        label="Especialidades"
        title="Áreas en las que"
        highlight="aporto valor."
      />

      <RevealGroup className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:auto-rows-fr lg:grid-cols-4" gap={0.06}>
        {skills.map(({ title, text, Icon, size }, i) => {
          const hero = i === 0;
          return (
            <RevealItem key={title} className={clsx("md:min-h-52", layout[i])}>
              <Card
                className={clsx(
                  "group relative flex h-full flex-col overflow-hidden p-6 sm:p-7",
                  hero ? "justify-end lg:p-10" : "justify-between gap-8",
                )}
              >
                {/* Ícono gigante decorativo */}
                <Icon
                  aria-hidden="true"
                  className={clsx(
                    "pointer-events-none absolute text-fg opacity-[0.04] transition-all duration-700 can-hover:group-hover:opacity-[0.08]",
                    hero ? "-top-6 -right-6 size-72 can-hover:group-hover:-rotate-6" : "-right-4 -bottom-4 size-28 can-hover:group-hover:scale-110",
                  )}
                />

                <span
                  className={clsx(
                    "relative grid place-items-center rounded-2xl border border-line bg-surface text-accent-soft transition-colors duration-500 can-hover:group-hover:border-transparent can-hover:group-hover:bg-brand can-hover:group-hover:text-white",
                    hero ? "mb-auto size-16" : "size-12",
                  )}
                >
                  <Icon aria-hidden="true" className={hero ? "size-7" : "size-5"} />
                </span>

                <div className="relative">
                  <h3 className={clsx("mb-2", hero ? "text-h2 mt-10" : "text-h3", size === "lg" && !hero && "lg:text-[1.75rem]")}>
                    {title}
                  </h3>
                  <p className={clsx("text-muted text-pretty", hero ? "text-body max-w-md" : "text-sm leading-relaxed")}>{text}</p>
                </div>
              </Card>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
