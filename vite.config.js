import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // React + Motion + íconos rondan 165 KB gzip: dentro del presupuesto de 200 KB.
  build: { chunkSizeWarningLimit: 600 },
});
