import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://moinsen-dev.github.io",
  base: "/ThemeForge-BYOK",
  output: "static",
  adapter: cloudflare(),
  integrations: [react(), tailwind()],
});
