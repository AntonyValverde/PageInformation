import clsx from "clsx";
import { AnimatePresence, m } from "motion/react";
import { useCallback, useState } from "react";
import {
  FaArrowUpRightFromSquare, FaAward, FaBuildingColumns, FaChevronLeft, FaChevronRight, FaGraduationCap, FaXmark,
} from "react-icons/fa6";
import { certificates } from "../../data/certificates";
import { degrees } from "../../data/education";
import { formatMonthYear } from "../../lib/format";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Dialog } from "../ui/Dialog";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { Section, SectionHeading } from "../ui/Section";

// Títulos primero y luego cursos: el visor recorre ambos en ese orden.
const items = [
  ...degrees.map((d) => ({ ...d, displayTitle: `${d.level} en ${d.title}`, kind: "Título" })),
  ...certificates.map((c) => ({ ...c, displayTitle: c.title, kind: "Certificado" })),
];

const navBtn =
  "grid size-12 place-items-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md transition-colors duration-300 hover:bg-black/70";

function Lightbox({ index, onClose, onChange }) {
  const [direction, setDirection] = useState(0);
  const open = index !== null;
  const item = open ? items[index] : null;

  const go = useCallback(
    (step) => {
      setDirection(step);
      onChange((i) => (i + step + items.length) % items.length);
    },
    [onChange],
  );

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    },
    [go],
  );

  return (
    <Dialog open={open} onClose={onClose} label={item ? `${item.kind}: ${item.displayTitle}` : "Documento"} onKeyDown={onKeyDown}>
      {item && (
        <m.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex max-h-[calc(100svh-2rem)] flex-col gap-4"
        >
          <div className="flex items-center justify-between gap-4 text-white">
            <p className="font-mono text-sm text-white/70" aria-live="polite">
              {index + 1} / {items.length}
            </p>
            <button type="button" onClick={onClose} aria-label="Cerrar" className={navBtn}>
              <FaXmark size={18} />
            </button>
          </div>

          <div className="relative min-h-0 flex-1">
            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
              <m.img
                key={item.id}
                src={item.image}
                alt={`${item.kind} ${item.displayTitle}, emitido por ${item.issuer}`}
                width={item.width}
                height={item.height}
                custom={direction}
                variants={{
                  enter: (d) => ({ opacity: 0, x: d * 80 }),
                  center: { opacity: 1, x: 0 },
                  exit: (d) => ({ opacity: 0, x: d * -80 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60 || info.velocity.x < -400) go(1);
                  else if (info.offset.x > 60 || info.velocity.x > 400) go(-1);
                }}
                className="mx-auto max-h-[70svh] w-auto cursor-grab rounded-2xl bg-white object-contain shadow-2xl active:cursor-grabbing"
                draggable={false}
              />
            </AnimatePresence>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 text-white sm:flex-row">
            <div className="text-center sm:text-left">
              <p className="font-display text-lg font-semibold">{item.displayTitle}</p>
              <p className="text-sm text-white/70">
                {item.issuer} · {formatMonthYear(item.date)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {item.credentialUrl && (
                <a
                  href={item.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 items-center gap-2 rounded-full border border-white/15 bg-black/50 px-5 text-sm backdrop-blur-md hover:bg-black/70"
                >
                  Verificar <FaArrowUpRightFromSquare size={12} />
                </a>
              )}
              <button type="button" onClick={() => go(-1)} aria-label="Anterior" className={navBtn}>
                <FaChevronLeft size={16} />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Siguiente" className={navBtn}>
                <FaChevronRight size={16} />
              </button>
            </div>
          </div>
        </m.div>
      )}
    </Dialog>
  );
}

function Thumb({ item, onOpen, className }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={clsx("relative block w-full overflow-hidden rounded-[calc(var(--radius-md)-6px)] bg-white text-left", className)}
      aria-label={`Ver ${item.kind.toLowerCase()}: ${item.displayTitle}`}
    >
      <img
        src={item.thumb}
        alt=""
        loading="lazy"
        decoding="async"
        width="640"
        height={Math.round((640 * item.height) / item.width)}
        className="size-full object-cover object-top transition-transform duration-700 ease-[var(--ease-out-expo)] can-hover:group-hover:scale-105"
      />
      <span className="absolute inset-0 grid place-items-center bg-black/0 transition-colors duration-500 can-hover:group-hover:bg-black/40">
        <span className="translate-y-3 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-black opacity-0 transition-all duration-500 can-hover:group-hover:translate-y-0 can-hover:group-hover:opacity-100">
          Ampliar
        </span>
      </span>
    </button>
  );
}

function SubHeading({ icon: Icon, children, count }) {
  return (
    <Reveal className="mb-6 flex items-center gap-3">
      <span className="grid size-9 place-items-center rounded-full border border-line text-accent-soft">
        <Icon size={14} aria-hidden="true" />
      </span>
      <h3 className="text-h3">{children}</h3>
      <span className="font-mono text-xs text-muted">{count}</span>
      <span aria-hidden="true" className="h-px flex-1 bg-line" />
    </Reveal>
  );
}

export function Education() {
  const [index, setIndex] = useState(null);
  const close = useCallback(() => setIndex(null), []);

  return (
    <Section id="formacion">
      <SectionHeading
        id="formacion"
        index="06"
        label="Formación"
        title="Formación académica y"
        highlight="aprendizaje continuo."
        subtitle="Mis títulos universitarios y los cursos y credenciales que los complementan."
      />

      <SubHeading icon={FaGraduationCap} count={degrees.length}>
        Títulos universitarios
      </SubHeading>

      <RevealGroup className="mb-16 grid gap-4 lg:grid-cols-2 lg:gap-5" gap={0.1}>
        {items.slice(0, degrees.length).map((d, i) => (
          <RevealItem key={d.id} className="h-full">
            <Card
              as="article"
              className={clsx(
                "group grid h-full gap-5 p-3 sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] sm:items-center sm:gap-6",
                i === 0 && "gradient-border can-hover:hover:border-line",
              )}
            >
              <Thumb item={d} onOpen={() => setIndex(i)} className="aspect-[5/4]" />
              <div className="flex flex-col gap-3 px-3 pb-3 sm:py-3 sm:pr-5 sm:pl-0">
                <span className="text-label w-fit rounded-full bg-brand px-3 py-1 text-[0.65rem] text-white">{d.level}</span>
                <h4 className="text-h3 text-balance">{d.title}</h4>
                <p className="flex items-start gap-2 text-sm text-muted">
                  <FaBuildingColumns size={13} aria-hidden="true" className="mt-0.5 shrink-0 text-accent-soft" />
                  <span>
                    {d.institution}
                    <br />
                    {d.campus}
                  </span>
                </p>
                <p className="font-mono text-xs text-muted">{formatMonthYear(d.date)}</p>
                <Button variant="secondary" size="sm" onClick={() => setIndex(i)} className="mt-2 w-fit">
                  Ver título
                </Button>
              </div>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>

      <SubHeading icon={FaAward} count={certificates.length}>
        Cursos y certificaciones
      </SubHeading>

      <RevealGroup className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" gap={0.08}>
        {items.slice(degrees.length).map((c, i) => (
          <RevealItem key={c.id}>
            <Card as="article" className="group h-full overflow-hidden p-2">
              <Thumb item={c} onOpen={() => setIndex(degrees.length + i)} className="aspect-[4/3]" />
              <div className="flex items-start gap-3 p-4">
                <FaAward aria-hidden="true" className="mt-1 shrink-0 text-accent-soft" />
                <div>
                  <h4 className="font-display leading-snug font-semibold">{c.title}</h4>
                  <p className="mt-1 text-sm text-muted">{c.issuer}</p>
                  <p className="mt-1 font-mono text-xs text-muted">{formatMonthYear(c.date)}</p>
                </div>
              </div>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>

      <Lightbox index={index} onClose={close} onChange={setIndex} />
    </Section>
  );
}
