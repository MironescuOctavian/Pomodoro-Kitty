import { defineConfig } from "vite-plus";
import { cloudflare } from "@cloudflare/vite-plugin";
import solid from "@solidjs/vite-plugin";
import { fileRoutes } from "filesystem-routing/vite";
import { i18n } from "@rimelight/i18n/plugin";
import UnoCSS from "unocss/vite";

export default defineConfig({
  builder: { sharedPlugins: true },
  server: { headers: { "Cache-Control": "no-store" } },
  lint: { options: { typeAware: true, typeCheck: true } },
  staged: {
    "{package.json,pnpm-workspace.yaml,pnpm-lock.yaml}": () => "pnpm audit",
    "*": "vp check --fix",
  },
  plugins: [
    cloudflare(),
    solid({ exclude: ["src/fetch.ts"], start: true, ssr: true, serverFunctions: true }),
    fileRoutes({ types: ".cloudflare/types/file-routes.d.ts" }),
    UnoCSS({ mode: "dist-chunk" }),
    i18n({ defaultLocale: "en", types: ".cloudflare/types/i18n.d.ts" }),
    {
      name: "ssr-hot-reload",
      hotUpdate({ type }) {
        if (this.environment.name !== "client" && type === "update") {
          this.environment.hot.send({ type: "full-reload" });
          return [];
        }
        return undefined;
      },
    },
  ],
});
