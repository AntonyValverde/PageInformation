import { FaArrowUp } from "../ui/icons";
import { profile, socials } from "../../data/profile";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";
import { Monogram } from "../ui/Monogram";
import { SocialIcon } from "../ui/SocialIcon";

export function Footer() {
  const { scrollTo } = useSmoothScroll();

  return (
    <footer className="relative border-t border-line pb-[env(safe-area-inset-bottom)]">
      <div className="container-page flex flex-col items-center justify-between gap-6 py-10 md:flex-row">
        <div className="flex items-center gap-3">
          <Monogram className="size-8" />
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {profile.name}. Todos los derechos reservados.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {socials.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="grid size-11 place-items-center rounded-full text-muted transition-colors duration-300 can-hover:hover:bg-surface can-hover:hover:text-fg"
            >
              <SocialIcon id={s.id} size={17} />
            </a>
          ))}
          <span aria-hidden="true" className="mx-2 h-6 w-px bg-line" />
          <button
            type="button"
            onClick={() => scrollTo("inicio")}
            className="group flex h-11 items-center gap-2 rounded-full border border-line px-4 text-sm text-muted transition-colors duration-300 can-hover:hover:border-line-strong can-hover:hover:text-fg"
          >
            Volver arriba
            <FaArrowUp className="transition-transform duration-300 can-hover:group-hover:-translate-y-0.5" size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}
