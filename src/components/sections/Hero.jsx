import { m, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { FaArrowRight, FaDownload, FaJava, SiJavascript, SiPython, SiReact } from "../ui/icons";
import { profile, socials } from "../../data/profile";
import { useFinePointer } from "../../hooks/useMediaQuery";
import { useScramble } from "../../hooks/useScramble";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";
import { Button } from "../ui/Button";
import { EASE } from "../ui/Reveal";
import { SocialIcon } from "../ui/SocialIcon";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
const letter = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.9, ease: EASE } },
};

function AnimatedWord({ text, className }) {
  return (
    <span className={`inline-flex overflow-hidden pb-[0.12em] ${className ?? ""}`}>
      <m.span className="inline-flex" variants={{ show: { transition: { staggerChildren: 0.035 } } }}>
        {[...text].map((ch, i) => (
          <m.span key={i} variants={letter} className="inline-block">
            {ch}
          </m.span>
        ))}
      </m.span>
    </span>
  );
}

const chips = [
  { label: "React", Icon: SiReact, color: "#61dafb", className: "-left-6 top-[12%] sm:-left-10", delay: "0s" },
  { label: "Java", Icon: FaJava, color: "#f89820", className: "-right-4 top-[38%] sm:-right-10", delay: "1.2s" },
  { label: "Python", Icon: SiPython, color: "#3776ab", className: "-left-2 bottom-[10%] sm:-left-8", delay: "2.1s" },
  { label: "JavaScript", Icon: SiJavascript, color: "#f7df1e", className: "right-2 -bottom-4 hidden sm:flex", delay: "0.6s" },
];

function Portrait() {
  const ref = useRef(null);
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const enabled = fine && !reduce;

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [8, -8]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-8, 8]), { stiffness: 150, damping: 18 });

  return (
    <m.div
      // Sin opacidad 0: la foto es el LCP y debe contar como pintada desde el primer render.
      variants={{
        hidden: { scale: 0.88, filter: "blur(14px)" },
        show: { scale: 1, filter: "blur(0px)", transition: { duration: 1.1, ease: EASE, delay: 0.15 } },
      }}
      className="relative mx-auto w-[min(62vw,15rem)] sm:w-[18rem] lg:w-full lg:max-w-[25rem]"
    >
      <m.div
        ref={ref}
        style={enabled ? { rotateX, rotateY, transformPerspective: 1000 } : undefined}
        onPointerMove={(e) => {
          if (!enabled) return;
          const r = ref.current.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width);
          py.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          px.set(0.5);
          py.set(0.5);
        }}
        className="relative aspect-square"
      >
        {/* Halo */}
        <div aria-hidden="true" className="absolute -inset-10 rounded-full bg-brand opacity-25 blur-3xl light:opacity-20" />
        {/* Anillo con gradiente cónico que gira */}
        <div
          aria-hidden="true"
          className="absolute -inset-[3px] rounded-[2.1rem]"
          style={{
            background: "conic-gradient(from var(--angle), var(--accent), var(--accent-2), #a855f7, var(--accent))",
            animation: "border-spin 7s linear infinite",
          }}
        />
        <div className="absolute inset-0 overflow-hidden rounded-[2rem] bg-elevated">
          <img
            src="/images/perfil.webp"
            srcSet="/images/perfil-320.webp 320w, /images/perfil.webp 640w"
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 288px, 62vw"
            width="640"
            height="640"
            alt={`Foto de ${profile.name}`}
            fetchPriority="high"
            decoding="async"
            className="size-full object-cover brightness-110 contrast-105"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-transparent" />
        </div>

        {chips.map(({ label, Icon, color, className, delay }) => (
          <div
            key={label}
            className={`glass animate-float absolute flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium shadow-lg sm:text-sm ${className}`}
            style={{ animationDelay: delay }}
          >
            <Icon aria-hidden="true" style={{ color }} className="size-4" />
            {label}
          </div>
        ))}
      </m.div>
    </m.div>
  );
}

export function Hero({ ready }) {
  const reduce = useReducedMotion();
  const { scrollTo } = useSmoothScroll();
  const role = useScramble(profile.roles, { enabled: ready && !reduce });

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const go = (e, id) => {
    e.preventDefault();
    scrollTo(id);
  };

  return (
    <section
      id="inicio"
      ref={sectionRef}
      aria-label="Presentación"
      className="relative flex min-h-svh items-center pt-[calc(6rem+env(safe-area-inset-top))] pb-24 lg:pt-28"
    >
      <m.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        initial="hidden"
        animate={ready ? "show" : "hidden"}
        variants={container}
        className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-8"
      >
        <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:col-span-7 lg:items-start lg:text-left">
          {profile.available && (
            <m.p variants={item} className="glass mb-6 inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm text-muted">
              <span className="relative flex size-2.5">
                <span className="animate-ping-slow absolute inline-flex size-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-success" />
              </span>
              Disponible para nuevos proyectos
            </m.p>
          )}

          <m.p variants={item} className="text-label mb-4 text-accent-soft">
            Hola, soy
          </m.p>

          <h1 className="text-display mb-6">
            <span className="sr-only">{profile.name}</span>
            <span aria-hidden="true" className="flex flex-col">
              <AnimatedWord text={profile.firstName} />
              <AnimatedWord text={profile.lastName} className="text-gradient" />
            </span>
          </h1>

          <m.p variants={item} className="mb-6 font-mono text-base text-fg sm:text-lg">
            <span className="text-accent-2">&gt;</span>{" "}
            <span className="sr-only">{profile.roles.join(", ")}</span>
            <span aria-hidden="true">{role}</span>
            <span aria-hidden="true" className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.2em] animate-pulse bg-accent-2" />
          </m.p>

          <m.p variants={item} className="text-body mb-10 max-w-xl text-muted text-pretty">
            {profile.shortBio}
          </m.p>

          <m.div variants={item} className="mb-10 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Button href="#proyectos" onClick={(e) => go(e, "proyectos")} size="lg" magnetic className="group">
              Ver proyectos
              <FaArrowRight className="transition-transform duration-300 can-hover:group-hover:translate-x-1" />
            </Button>
            <Button href="#contacto" onClick={(e) => go(e, "contacto")} size="lg" variant="secondary" magnetic>
              Contactar
            </Button>
            {profile.cvUrl && (
              <Button href={profile.cvUrl} download size="lg" variant="ghost">
                <FaDownload /> Descargar CV
              </Button>
            )}
          </m.div>

          <m.ul variants={item} className="flex items-center gap-2" aria-label="Redes sociales">
            {socials.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-11 place-items-center rounded-full border border-line text-muted transition-all duration-300 can-hover:hover:-translate-y-0.5 can-hover:hover:border-line-strong can-hover:hover:text-fg"
                >
                  <SocialIcon id={s.id} size={17} />
                </a>
              </li>
            ))}
          </m.ul>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-5">
          <Portrait />
        </div>
      </m.div>

      <m.div
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <m.a
          href="#sobre-mi"
          onClick={(e) => go(e, "sobre-mi")}
          aria-label="Bajar a la siguiente sección"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0, transition: { delay: 1.2 } }}
          className="flex flex-col items-center gap-2 text-muted"
        >
          <span className="text-label">Scroll</span>
          <span className="flex h-10 w-6 justify-center rounded-full border border-line-strong pt-2">
            <m.span
              className="block h-2 w-1 rounded-full bg-accent-2"
              animate={reduce ? undefined : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </m.a>
      </m.div>
    </section>
  );
}
