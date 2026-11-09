import type { Preset } from "unocss";
import foundation from "./foundation";
import components from "./components";
import dashboard from "./dashboard";
import responsive from "./responsive";
import { coatCatalog } from "../src/kitty/coats";

/** Shared selectors live in ordered preflights; reusable controls use shortcuts. */
export function presetKitty(): Preset {
  return {
    name: "pomodoro-kitty",
    preflights: [foundation, components, dashboard, responsive].map((css) => ({
      getCSS: () => css,
    })),
    safelist: coatCatalog.map((_, index) => `coat-preview-${index}`),
    rules: [
      [
        /^coat-preview-(\d+)$/,
        ([, index]) => {
          const coat = coatCatalog[Number(index)];
          return coat ? { background: coat.swatch } : undefined;
        },
      ],
    ],
    shortcuts: {
      "artwork-slot": "border border-dashed border-[var(--rule)] bg-[var(--paper)]",
    },
  };
}
