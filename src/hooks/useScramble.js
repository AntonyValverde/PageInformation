import { useEffect, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ<>/{}[]#$%&*+=_";

// Rota entre palabras con un efecto de "descifrado" de letras.
export function useScramble(words, { interval = 2800, duration = 700, enabled = true } = {}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    if (!enabled) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval, enabled]);

  useEffect(() => {
    const target = words[index];
    if (!enabled) {
      setText(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const revealed = Math.floor(progress * target.length);
      let out = target.slice(0, revealed);
      for (let i = revealed; i < target.length; i++) {
        out += target[i] === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      setText(out);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [index, words, duration, enabled]);

  return text;
}
