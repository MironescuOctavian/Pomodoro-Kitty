import { bindings, defineConfig } from "cf/config";

export default defineConfig({
  worker: {
    name: "minimalist-pomodoro",
    compatibilityDate: "2026-10-01",
    entrypoint: "./src/fetch.ts",
    observability: {
      enabled: false,
      logs: { enabled: false, invocationLogs: false, persist: false },
      traces: { enabled: false },
      issues: { enabled: false },
    },
    logpush: false,
    cache: { enabled: true },
    env: { ASSETS: bindings.assets() },
  },
});
