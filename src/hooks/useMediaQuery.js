import { useSyncExternalStore } from "react";

export function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

// Dispositivos con mouse/trackpad: habilita tilt, magnetismo y spotlight.
export const useFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine)");
