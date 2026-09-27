import { useEffect, useState } from "react";

// Devuelve el id de la sección que ocupa la franja central del viewport.
// Observa también las secciones que se montan más tarde (carga diferida).
export function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observed = new Set();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    const attach = () => {
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && !observed.has(el)) {
          observed.add(el);
          io.observe(el);
        }
      }
      if (observed.size === ids.length) mo.disconnect();
    };

    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });
    attach();

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [ids]);

  return active;
}
