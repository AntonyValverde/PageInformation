import clsx from "clsx";
import { m } from "motion/react";
import { EASE } from "./Reveal";

export function Section({ id, className, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={clsx("section-space relative", className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}

const line = {
  hidden: { opacity: 0, y: "0.6em" },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

// Encabezado: etiqueta mono numerada, título con una parte en gradiente y subtítulo.
export function SectionHeading({ id, index, label, title, highlight, subtitle, align = "left", className }) {
  return (
    <m.header
      className={clsx(
        "mb-12 flex flex-col gap-4 md:mb-16",
        align === "center" && "items-center text-center",
        className,
      )}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ staggerChildren: 0.08 }}
    >
      <m.p variants={line} className="text-label flex items-center gap-3 text-accent-soft">
        <span aria-hidden="true" className="h-px w-8 bg-brand" />
        <span>
          {index} — {label}
        </span>
      </m.p>
      <m.h2 id={`${id}-title`} variants={line} className="text-h2 max-w-4xl text-balance">
        {title} {highlight && <span className="text-gradient">{highlight}</span>}
      </m.h2>
      {subtitle && (
        <m.p variants={line} className="text-body max-w-2xl text-muted text-pretty">
          {subtitle}
        </m.p>
      )}
    </m.header>
  );
}
