import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { navLinks, profile, socials } from "../../data/profile";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";
import { Button } from "../ui/Button";
import { Monogram } from "../ui/Monogram";
import { SocialIcon } from "../ui/SocialIcon";
import { ThemeToggle } from "./ThemeToggle";

const ids = navLinks.map((l) => l.id);

export function Navbar() {
  const { scrollTo, lock } = useSmoothScroll();
  const active = useScrollSpy(ids);
  const desktop = useMediaQuery("(min-width: 1024px)");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > prev && y > 240);
  });

  const go = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollTo(id);
    history.replaceState(null, "", `#${id}`);
  };

  useEffect(() => {
    if (desktop) setMenuOpen(false);
  }, [desktop]);

  useEffect(() => {
    if (!menuOpen) return;
    lock(true);
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      lock(false);
      document.removeEventListener("keydown", onKey);
      toggleRef.current?.focus();
    };
  }, [menuOpen, lock]);

  const hide = hidden && !desktop && !menuOpen;

  return (
    <>
      <m.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-brand"
      />

      <m.header
        animate={{ y: hide ? "-110%" : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[60] pt-[env(safe-area-inset-top)]"
      >
        <div
          className={clsx(
            "transition-[background-color,border-color,backdrop-filter] duration-500",
            scrolled || menuOpen
              ? "border-b border-line bg-bg/70 backdrop-blur-xl backdrop-saturate-150"
              : "border-b border-transparent",
          )}
        >
          <nav
            aria-label="Principal"
            className={clsx(
              "container-page flex items-center justify-between gap-4 transition-[height] duration-500",
              scrolled ? "h-16" : "h-[4.5rem] lg:h-20",
            )}
          >
            <a href="#inicio" onClick={(e) => go(e, "inicio")} className="group flex items-center gap-3" aria-label="Ir al inicio">
              <Monogram className="size-9 transition-transform duration-500 can-hover:group-hover:rotate-[-8deg]" />
              <span className="hidden font-display text-[0.95rem] font-semibold tracking-tight sm:block">
                {profile.name}
              </span>
            </a>

            <ul className="hidden items-center gap-1 rounded-full border border-line bg-surface p-1 backdrop-blur-md lg:flex">
              {navLinks.slice(1).map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => go(e, link.id)}
                    aria-current={active === link.id ? "true" : undefined}
                    className={clsx(
                      "relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                      active === link.id ? "text-fg" : "text-muted can-hover:hover:text-fg",
                    )}
                  >
                    {active === link.id && (
                      <m.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full border border-line-strong bg-surface-hover"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <span className="hidden lg:block">
                <Button href="#contacto" onClick={(e) => go(e, "contacto")} size="sm">
                  Contactar
                </Button>
              </span>
              <button
                ref={toggleRef}
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                className="relative grid size-11 place-items-center rounded-full border border-line lg:hidden"
              >
                <span className="sr-only">Menú</span>
                <span aria-hidden="true" className="relative block h-3 w-5">
                  <span
                    className={clsx(
                      "absolute left-0 h-0.5 w-5 rounded-full bg-fg transition-all duration-300",
                      menuOpen ? "top-[5px] rotate-45" : "top-0",
                    )}
                  />
                  <span
                    className={clsx(
                      "absolute left-0 h-0.5 w-5 rounded-full bg-fg transition-all duration-300",
                      menuOpen ? "top-[5px] -rotate-45" : "top-[10px]",
                    )}
                  />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </m.header>

      <AnimatePresence>
        {menuOpen && (
          <m.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            className="fixed inset-0 z-[55] flex flex-col bg-bg/95 px-[clamp(1rem,4vw,2.5rem)] pt-[calc(6rem+env(safe-area-inset-top))] pb-[calc(2rem+env(safe-area-inset-bottom))] backdrop-blur-2xl lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.25rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.25rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.25rem)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <m.ul
              className="flex flex-1 flex-col justify-center gap-1"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }}
            >
              {navLinks.map((link, i) => (
                <m.li
                  key={link.id}
                  variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => go(e, link.id)}
                    className={clsx(
                      "flex items-baseline gap-4 py-2 font-display text-[clamp(2rem,9vw,3.5rem)] font-semibold tracking-tight",
                      active === link.id ? "text-gradient" : "text-fg",
                    )}
                  >
                    <span className="text-label text-muted">0{i + 1}</span>
                    {link.label}
                  </a>
                </m.li>
              ))}
            </m.ul>

            <m.div
              className="flex items-center justify-between gap-4 border-t border-line pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
            >
              <a href={`mailto:${profile.email}`} className="truncate text-sm text-muted">
                {profile.email}
              </a>
              <div className="flex gap-1">
                {socials.map((s) => (
                  <a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:text-fg"
                  >
                    <SocialIcon id={s.id} size={18} />
                  </a>
                ))}
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
