import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://moinsen-dev.github.io",
  base: "/ThemeForge-BYOK",
  output: "static",
  integrations: [react(), tailwind()],
});
