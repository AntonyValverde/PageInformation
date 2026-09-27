import { useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Monogram } from "../ui/Monogram";

const KEY = "intro-seen";

function shouldShow() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return !sessionStorage.getItem(KEY);
  } catch {
    return false;
  }
}

// Pantalla de entrada breve, solo la primera vez de cada sesión.
export function Intro({ onDone }) {
  const [visible, setVisible] = useState(shouldShow);

  useEffect(() => {
    if (!visible) {
      onDone();
      return;
    }
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* sin almacenamiento */
    }
    const t = setTimeout(() => setVisible(false), 900);
    return () => clearTimeout(t);
  }, [visible, onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          className="fixed inset-0 z-[200] grid place-items-center bg-bg"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <m.div
            className="flex flex-col items-center gap-5"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Monogram draw className="size-20 md:size-24" strokeWidth={2} />
            <m.span
              className="text-label text-muted"
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              Antony Valverde
            </m.span>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
