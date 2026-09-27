// Copia los datos SVG de los íconos de la carga inicial a src/components/ui/icons.js.
// Así el bundle principal no arrastra los módulos completos de react-icons.
// Uso: node scripts/generate-icons.mjs
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const ICONS = {
  fa6: ["FaArrowRight", "FaDownload", "FaJava", "FaMoon", "FaSun", "FaArrowUp", "FaGithub", "FaLinkedinIn", "FaInstagram", "FaFacebookF"],
  si: ["SiReact", "SiPython", "SiJavascript"],
};

let out = `// Generado por scripts/generate-icons.mjs — no editar a mano.
// Íconos de la carga inicial (hero, navbar, footer) sin importar los paquetes completos de react-icons.
import { GenIcon } from "react-icons/lib";

`;

for (const [pack, names] of Object.entries(ICONS)) {
  const src = readFileSync(path.join(ROOT, "node_modules", "react-icons", pack, "index.mjs"), "utf8");
  for (const name of names) {
    const match = src.match(new RegExp(`export function ${name} \\(props\\) \\{\\s*return GenIcon\\((\\{[\\s\\S]*?\\})\\)\\(props\\);`));
    if (!match) throw new Error(`No se encontró ${name} en react-icons/${pack}`);
    out += `export const ${name} = (props) => GenIcon(${match[1].replace(/\s+/g, " ")})(props);\n`;
  }
}

writeFileSync(path.join(ROOT, "src", "components", "ui", "icons.js"), out);
console.log("src/components/ui/icons.js generado");
