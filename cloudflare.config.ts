import { bindings, defineConfig, exports } from "cf/config";

export default defineConfig({
  worker: {
    name: "pomodoro-kitty",
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
    exports: { FocusRoom: exports.durableObject({ storage: "sqlite" }) },
    env: {
      ASSETS: bindings.assets(),
      FOCUS_ROOMS: bindings.durableObject({ worker: "pomodoro-kitty", exportName: "FocusRoom" }),
    },
  },
});
