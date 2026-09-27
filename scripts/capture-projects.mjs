// Captura la demo (homepage) de cada repo público y genera las vistas previas.
// Uso: npm run capture:projects   (requiere Chrome o Edge instalado; CHROME_PATH para otra ruta)
import puppeteer from "puppeteer-core";
import sharp from "sharp";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const USER = "AntonyValverde";
const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public", "images", "projects");
const MANIFEST = path.join(ROOT, "src", "data", "projectPreviews.json");
const WAIT = { Flowers: 5000 };

const browserPath =
  process.env.CHROME_PATH ||
  [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
  ].find(existsSync);

if (!browserPath) {
  console.error("No se encontró Chrome/Edge. Define CHROME_PATH.");
  process.exit(1);
}

const res = await fetch(`https://api.github.com/users/${USER}/repos?per_page=100`);
if (!res.ok) throw new Error(`GitHub respondió ${res.status}`);
const repos = (await res.json()).filter((r) => r.homepage && !r.fork && r.name !== "PageInformation");

await mkdir(OUT, { recursive: true });
const browser = await puppeteer.launch({ executablePath: browserPath, headless: true, args: ["--hide-scrollbars"] });
const manifest = {};

for (const repo of repos) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  try {
    await page.goto(repo.homepage, { waitUntil: "networkidle2", timeout: 30000 });
    // Espera a que terminen las animaciones de entrada (algunas demos necesitan más)
    await new Promise((r) => setTimeout(r, WAIT[repo.name] ?? 1500));
    const png = await page.screenshot({ type: "png" });
    const file = `${repo.name.toLowerCase()}.webp`;
    await sharp(png).resize(960).webp({ quality: 72 }).toFile(path.join(OUT, file));
    manifest[repo.name] = `/images/projects/${file}`;
    console.log(`✓ ${repo.name}`);
  } catch (err) {
    console.warn(`✗ ${repo.name}: ${err.message}`);
  } finally {
    await page.close();
  }
}

await browser.close();
await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`Vistas previas: ${Object.keys(manifest).length}/${repos.length}`);
