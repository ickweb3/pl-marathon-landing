import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// Aliases match pl-fe-cabinet so a widget file moves between the two repos unchanged.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: fileURLToPath(new URL("./src/assets", import.meta.url)),
      pages: fileURLToPath(new URL("./src/UI/pages", import.meta.url)),
      shared: fileURLToPath(new URL("./src/UI/pages/Proyavys/shared", import.meta.url)),
    },
  },
  server: { port: 5178 },
  build: { outDir: "dist" },
});
