// Títulos universitarios (del más reciente al más antiguo).
// Las imágenes publicadas ocultan el número de identificación (ver scripts/optimize-images.mjs).
export const degrees = [
  {
    id: "bachillerato-sistemas",
    level: "Bachillerato",
    title: "Ingeniería en Sistemas de Información",
    institution: "Universidad Nacional de Costa Rica",
    campus: "Sede Región Brunca",
    date: "2026-05-29",
    width: 990,
    height: 788,
  },
  {
    id: "diplomado-programacion",
    level: "Diplomado",
    title: "Programación de Aplicaciones Informáticas",
    institution: "Universidad Nacional de Costa Rica",
    campus: "Sede Región Brunca",
    date: "2025-11-06",
    width: 1400,
    height: 1130,
  },
].map((d) => ({
  ...d,
  issuer: `${d.institution} · ${d.campus}`,
  image: `/images/degrees/${d.id}.webp`,
  thumb: `/images/degrees/${d.id}-thumb.webp`,
}));
