import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";

const SmoothScrollContext = createContext(null);

const NAV_OFFSET = -72;

export function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Scroll inercial solo con mouse/trackpad y sin preferencia de movimiento reducido.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduce || !fine) return;

    // Se descarga solo en equipos con mouse/trackpad
    let cancelled = false;
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenisRef.current = new Lenis({ autoRaf: true, duration: 1.1, anchors: { offset: NAV_OFFSET } });
    });
    return () => {
      cancelled = true;
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((target) => {
    const el = typeof target === "string" ? document.getElementById(target) : target;
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: NAV_OFFSET });
    } else {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const top = el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET;
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    }
  }, []);

  // Pausa el scroll de fondo mientras hay un modal o menú abierto.
  const lock = useCallback((locked) => {
    const lenis = lenisRef.current;
    if (lenis) locked ? lenis.stop() : lenis.start();
    document.documentElement.style.overflow = locked ? "hidden" : "";
  }, []);

  const value = useMemo(() => ({ scrollTo, lock }), [scrollTo, lock]);
  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>;
}

export const useSmoothScroll = () => useContext(SmoothScrollContext);
