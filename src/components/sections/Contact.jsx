import { AnimatePresence, m } from "motion/react";
import { useState } from "react";
import { FaArrowRight, FaBuildingColumns, FaCheck, FaCopy, FaEnvelope, FaLocationDot, FaPhone, FaWhatsapp } from "react-icons/fa6";
import { profile, socials } from "../../data/profile";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { Section, SectionHeading } from "../ui/Section";
import { SocialIcon } from "../ui/SocialIcon";

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${value}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="relative z-10 flex h-11 items-center gap-2 rounded-full border border-line px-4 text-sm text-muted transition-colors duration-300 can-hover:hover:border-line-strong can-hover:hover:text-fg"
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={copied ? "ok" : "copy"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2"
        >
          {copied ? <FaCheck className="text-success" aria-hidden="true" /> : <FaCopy aria-hidden="true" />}
          {copied ? "¡Copiado!" : "Copiar"}
        </m.span>
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">
        {copied ? "Correo copiado al portapapeles" : ""}
      </span>
    </button>
  );
}

function InfoCard({ icon: Icon, label, value, href, action, className }) {
  return (
    <Card className={`group flex h-full flex-col gap-6 p-6 ${className ?? ""}`}>
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-12 place-items-center rounded-2xl border border-line bg-surface text-accent-soft">
          <Icon size={18} aria-hidden="true" />
        </span>
        {action}
      </div>
      <div className="mt-auto min-w-0">
        <p className="text-label mb-2 text-muted">{label}</p>
        {href ? (
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="block truncate font-display text-lg font-medium text-fg transition-colors duration-300 after:absolute after:inset-0 after:content-[''] can-hover:group-hover:text-accent-soft sm:text-xl"
          >
            {value}
          </a>
        ) : (
          <p className="font-display text-lg font-medium text-fg sm:text-xl">{value}</p>
        )}
      </div>
    </Card>
  );
}

export function Contact() {
  return (
    <Section id="contacto" className="pb-16">
      <SectionHeading
        id="contacto"
        index="07"
        label="Contacto"
        title="¿Tienes un proyecto en mente?"
        highlight="Hablemos."
        subtitle="Escríbeme por el medio que prefieras y te respondo lo antes posible."
      />

      <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:col-span-8" gap={0.08}>
          <RevealItem className="sm:col-span-2">
            <InfoCard
              icon={FaEnvelope}
              label="Correo"
              value={profile.email}
              href={`mailto:${profile.email}`}
              action={<CopyButton value={profile.email} />}
            />
          </RevealItem>
          <RevealItem>
            <InfoCard
              icon={FaPhone}
              label="Teléfono"
              value={profile.phoneDisplay}
              href={`tel:${profile.phone}`}
              action={
                profile.whatsapp && (
                  <a
                    href={profile.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Escribir por WhatsApp"
                    className="relative z-10 grid size-11 place-items-center rounded-full border border-line text-muted transition-colors duration-300 can-hover:hover:border-[#25d366] can-hover:hover:text-[#25d366]"
                  >
                    <FaWhatsapp size={18} />
                  </a>
                )
              }
            />
          </RevealItem>
          <RevealItem>
            <InfoCard icon={FaLocationDot} label="Ubicación" value={profile.location} />
          </RevealItem>
          <RevealItem className="sm:col-span-2">
            <InfoCard icon={FaBuildingColumns} label="Formación" value={`${profile.degree} · ${profile.university}`} />
          </RevealItem>
        </RevealGroup>

        <Reveal className="lg:col-span-4" delay={0.15}>
          <Card className="flex h-full flex-col p-6 sm:p-8">
            <p className="text-label mb-6 text-muted">Redes sociales</p>
            <ul className="mb-8 flex flex-col gap-2">
              {socials.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex min-h-14 items-center gap-4 rounded-2xl border border-transparent px-3 py-2 transition-colors duration-300 can-hover:hover:border-line can-hover:hover:bg-surface-hover"
                  >
                    <span className="grid size-10 place-items-center rounded-xl border border-line text-fg">
                      <SocialIcon id={s.id} size={17} />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="font-medium">{s.label}</span>
                      <span className="truncate text-xs text-muted">{s.handle}</span>
                    </span>
                    <FaArrowRight
                      aria-hidden="true"
                      size={12}
                      className="-translate-x-1 text-muted opacity-0 transition-all duration-300 can-hover:group-hover/link:translate-x-0 can-hover:group-hover/link:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
            <Button href={`mailto:${profile.email}?subject=${encodeURIComponent("Hola Antony")}`} magnetic className="mt-auto w-full">
              Enviar un correo <FaArrowRight size={13} />
            </Button>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
