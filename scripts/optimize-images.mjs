// Genera las imágenes optimizadas de /public a partir de /assets/originals.
// Uso: npm run optimize:images
import sharp from "sharp";
import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "assets", "originals");
const OUT = path.join(ROOT, "public");

const monogram = (size, { background = true } = {}) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="g" gradientUnits="userSpaceOnUse" x1="3" y1="7" x2="29" y2="25">
      <stop offset="0" stop-color="#818cf8"/>
      <stop offset="1" stop-color="#22d3ee"/>
    </linearGradient>
  </defs>
  ${background ? '<rect width="32" height="32" rx="8" fill="#07080d"/>' : ""}
  <g fill="none" stroke="url(#g)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3.5 25 9.5 7 15.5 25"/>
    <path d="M5.9 18.5h7.2"/>
    <path d="M16.5 7 22.5 25 28.5 7"/>
  </g>
</svg>`;

// Red de nodos determinista para la imagen OG
function network(width, height, count) {
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const pts = Array.from({ length: count }, () => [rand() * width, rand() * height]);
  let lines = "";
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const d = Math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1]);
      if (d < 150) {
        const o = ((1 - d / 150) * 0.35).toFixed(3);
        lines += `<line x1="${pts[i][0].toFixed(1)}" y1="${pts[i][1].toFixed(1)}" x2="${pts[j][0].toFixed(1)}" y2="${pts[j][1].toFixed(1)}" stroke="#a5b4fc" stroke-opacity="${o}"/>`;
      }
    }
  }
  const dots = pts
    .map(([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.8" fill="#c7d2fe" fill-opacity="0.7"/>`)
    .join("");
  return lines + dots;
}

const ogImage = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="a" cx="0.15" cy="0.2" r="0.6"><stop offset="0" stop-color="#6366f1" stop-opacity="0.55"/><stop offset="1" stop-color="#6366f1" stop-opacity="0"/></radialGradient>
    <radialGradient id="b" cx="0.9" cy="0.85" r="0.55"><stop offset="0" stop-color="#22d3ee" stop-opacity="0.4"/><stop offset="1" stop-color="#22d3ee" stop-opacity="0"/></radialGradient>
    <linearGradient id="m" gradientUnits="userSpaceOnUse" x1="3" y1="7" x2="29" y2="25"><stop offset="0" stop-color="#818cf8"/><stop offset="1" stop-color="#22d3ee"/></linearGradient>
    <linearGradient id="t" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#818cf8"/><stop offset="1" stop-color="#22d3ee"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#07080d"/>
  <rect width="1200" height="630" fill="url(#a)"/>
  <rect width="1200" height="630" fill="url(#b)"/>
  <g>${network(1200, 630, 70)}</g>
  <g transform="translate(80 150) scale(3.2)">
    <g fill="none" stroke="url(#m)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3.5 25 9.5 7 15.5 25"/><path d="M5.9 18.5h7.2"/><path d="M16.5 7 22.5 25 28.5 7"/>
    </g>
  </g>
  <text x="80" y="370" font-family="Segoe UI, Arial, sans-serif" font-size="92" font-weight="700" fill="#e9ebf3" letter-spacing="-2">Antony Valverde</text>
  <text x="84" y="440" font-family="Segoe UI, Arial, sans-serif" font-size="38" font-weight="500" fill="url(#t)">Ingeniero en Sistemas · Web · Móvil · Bases de datos</text>
  <text x="84" y="540" font-family="Consolas, monospace" font-size="24" fill="#9ca2b8">page-information-lac.vercel.app</text>
</svg>`;

// Títulos universitarios: se tapa el número de identificación (no debe publicarse)
// y se recortan bordes o marcas del escáner. Coordenadas en píxeles del original.
const DEGREES = {
  "bachillerato-sistemas.png": {
    redact: [{ left: 60, top: 728, width: 175, height: 32 }],
  },
  "diplomado-programacion.jpg": {
    redact: [{ left: 105, top: 1243, width: 255, height: 38 }],
    crop: { left: 0, top: 14, width: 1600, height: 1291 }, // quita el borde superior y la marca de CamScanner
  },
};

// Recortes de certificados escaneados (quita la marca de agua de CamScanner).
const CERT_CROPS = {
  "congreso-ciberseguridad.jpg": { left: 0, top: 0, width: 1500, height: 1212 },
};

// Tapa cada zona clonando el papel liso de la misma franja, a su derecha (conserva textura y tono).
async function redact(input, zones) {
  const composites = [];
  for (const z of zones) {
    const patch = await sharp(input)
      .extract({ left: z.left + z.width + 10, top: z.top, width: z.width, height: z.height })
      .png()
      .toBuffer();
    composites.push({ input: patch, left: z.left, top: z.top });
  }
  return sharp(input).composite(composites).png().toBuffer();
}

async function main() {
  await mkdir(path.join(OUT, "images", "certificates"), { recursive: true });

  // Foto de perfil
  const perfil = path.join(SRC, "perfil.jpg");
  await sharp(perfil).resize(640).webp({ quality: 80 }).toFile(path.join(OUT, "images", "perfil.webp"));
  await sharp(perfil).resize(320).webp({ quality: 78 }).toFile(path.join(OUT, "images", "perfil-320.webp"));

  // Certificados: versión completa + miniatura (720 px: alcanza para la tarjeta ancha)
  const certDir = path.join(SRC, "certificates");
  for (const file of await readdir(certDir)) {
    const name = path.parse(file).name;
    let input = path.join(certDir, file);
    if (CERT_CROPS[file]) input = await sharp(input).extract(CERT_CROPS[file]).png().toBuffer();
    await sharp(input).resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 82 })
      .toFile(path.join(OUT, "images", "certificates", `${name}.webp`));
    await sharp(input).resize({ width: 720 }).webp({ quality: 74 })
      .toFile(path.join(OUT, "images", "certificates", `${name}-thumb.webp`));
  }

  // Títulos universitarios
  await mkdir(path.join(OUT, "images", "degrees"), { recursive: true });
  for (const [file, opts] of Object.entries(DEGREES)) {
    const name = path.parse(file).name;
    let img = await redact(path.join(SRC, "degrees", file), opts.redact);
    if (opts.crop) img = await sharp(img).extract(opts.crop).png().toBuffer();
    await sharp(img).resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 82 })
      .toFile(path.join(OUT, "images", "degrees", `${name}.webp`));
    await sharp(img).resize({ width: 640 }).webp({ quality: 76 })
      .toFile(path.join(OUT, "images", "degrees", `${name}-thumb.webp`));
  }

  // Íconos
  await writeFile(path.join(OUT, "favicon.svg"), monogram(32).trim());
  await sharp(Buffer.from(monogram(32))).resize(32).png().toFile(path.join(OUT, "favicon-32.png"));
  await sharp(Buffer.from(monogram(180))).png().toFile(path.join(OUT, "apple-touch-icon.png"));
  await sharp(Buffer.from(monogram(192))).png().toFile(path.join(OUT, "icon-192.png"));
  await sharp(Buffer.from(monogram(512))).png().toFile(path.join(OUT, "icon-512.png"));

  // Imagen para compartir en redes
  await sharp(Buffer.from(ogImage)).png({ compressionLevel: 9 }).toFile(path.join(OUT, "og.png"));

  console.log("Imágenes generadas en /public");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
