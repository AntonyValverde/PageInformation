import clsx from "clsx";
import { AnimatePresence, m } from "motion/react";
import { useId, useState } from "react";
import { FaChevronDown, FaTags } from "react-icons/fa6";
import { profile } from "../../data/profile";
import { comboDiscount, services } from "../../data/services";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { Section, SectionHeading } from "../ui/Section";

function quoteLink(title) {
  const subject = encodeURIComponent(`Cotización: ${title}`);
  const body = encodeURIComponent(`Hola Antony,\n\nMe interesa el servicio "${title}". Te cuento sobre mi proyecto:\n\n`);
  return `mailto:${profile.email}?subject=${subject}&body=${body}`;
}

function ServiceCard({ service }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const { title, Icon, price, priceSuffix, summary, breakdown, featured } = service;

  return (
    <Card className={clsx("group flex h-full flex-col p-6 sm:p-7", featured && "gradient-border can-hover:hover:border-line")}>
      {featured && (
        <span className="text-label absolute -top-3 left-6 z-10 rounded-full bg-brand px-3 py-1 text-[0.65rem] text-white shadow-lg">
          Más solicitado
        </span>
      )}

      <div className="mb-6 flex items-start justify-between gap-4">
        <span className="grid size-12 place-items-center rounded-2xl border border-line bg-surface text-accent-soft transition-colors duration-500 can-hover:group-hover:border-transparent can-hover:group-hover:bg-brand can-hover:group-hover:text-white">
          <Icon size={20} aria-hidden="true" />
        </span>
      </div>

      {/* Alturas mínimas para alinear precios entre tarjetas vecinas */}
      <h3 className="text-h3 mb-2 md:min-h-[2.4em]">{title}</h3>
      <p className="mb-6 text-sm leading-relaxed text-muted md:min-h-[3.25em]">{summary}</p>

      <p className="mb-6 flex flex-col">
        <span className="text-label mb-1 text-muted">Inversión</span>
        <span className="font-display text-4xl font-semibold tracking-tight">
          <span className="text-gradient">{price}</span>
          {priceSuffix && <span className="text-lg font-medium text-muted">{priceSuffix}</span>}
        </span>
      </p>

      <div className="mb-6 border-t border-line">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex min-h-12 w-full items-center justify-between py-3 text-sm font-medium text-fg"
        >
          {open ? "Ocultar desglose" : "Ver desglose"}
          <FaChevronDown size={12} aria-hidden="true" className={clsx("text-muted transition-transform duration-300", open && "rotate-180")} />
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <m.div
              id={panelId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <dl className="flex flex-col gap-2 pb-2">
                {breakdown.map((b) => (
                  <div key={b.label} className="flex items-baseline justify-between gap-4 text-sm">
                    <dt className="flex flex-1 items-baseline gap-4 text-muted after:flex-1 after:translate-y-[-3px] after:border-b after:border-dashed after:border-line after:content-['']">
                      {b.label}
                    </dt>
                    <dd className="font-mono text-fg">{b.value}</dd>
                  </div>
                ))}
              </dl>
            </m.div>
          )}
        </AnimatePresence>
      </div>

      <Button href={quoteLink(title)} variant={featured ? "primary" : "secondary"} size="sm" className="mt-auto w-full">
        Solicitar cotización
      </Button>
    </Card>
  );
}

export function Services() {
  return (
    <Section id="servicios">
      <SectionHeading
        id="servicios"
        index="05"
        label="Servicios y precios"
        title="Soluciones claras,"
        highlight="precios transparentes."
        subtitle="Cada servicio incluye su desglose para que sepas exactamente en qué inviertes."
      />

      <RevealGroup className="grid gap-4 pt-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-5" gap={0.08}>
        {services.map((s) => (
          <RevealItem key={s.title} className="h-full">
            <ServiceCard service={s} />
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="glass mt-8 flex flex-col items-center gap-3 rounded-[var(--radius-md)] px-6 py-5 text-center sm:flex-row sm:text-left">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand text-white">
          <FaTags size={15} aria-hidden="true" />
        </span>
        <p className="text-sm text-fg sm:text-base">{comboDiscount}</p>
      </Reveal>
    </Section>
  );
}
