import { defineConfig, presetWind3 } from "unocss";

export default defineConfig({
  presets: [presetWind3()],
  theme: {
    fontFamily: {
      sans: '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif',
      display: '"Fredoka", ui-rounded, system-ui, sans-serif',
    },
  },
  shortcuts: {
    "pal-product":
      "flex min-w-0 flex-col items-center gap-2 rounded-lg border border-solid border-[#E6D7C1] bg-[#FFFEF9] p-3 text-center transition-colors hover:bg-[#FBF5E9] [&_strong]:font-semibold motion-reduce:transition-none",
    "kitty-button":
      "cursor-pointer rounded-lg border border-solid border-[#E6D7C1] bg-transparent px-3.5 py-2.5 text-xs font-medium text-[#514238] transition-colors hover:bg-[#FFF0C8] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#F5AD20] focus-visible:outline-offset-2 aria-pressed:bg-[#FFF0C8] aria-pressed:border-[#D8BD91] motion-reduce:transition-none",
    "kitty-primary":
      "!bg-[#F5AD20] !border-[#F5AD20] !text-[#382B22] min-w-28 hover:!bg-[#E49B10] disabled:hover:!bg-[#F5AD20]",
    "kitty-muted": "text-sm leading-relaxed text-[#78675A]",
    "kitty-heading": "font-display text-xl tracking-tight font-medium mt-0 mb-1 text-[#382B22]",
    "kitty-row":
      "flex items-center justify-between gap-3 border-b border-solid border-[#E6D7C1] border-x-0 border-t-0 bg-transparent px-0 py-3 text-sm [&_small]:block [&_small]:mt-1 [&_small]:text-xs [&_small]:text-[#78675A] [&_button]:shrink-0",
    "kitty-note":
      "rounded-lg border border-solid border-[#E6D7C1] bg-[#FBF5E9] px-3 py-2.5 text-xs leading-relaxed text-[#78675A]",
    "kitty-scroll":
      "overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#D8BD91]",
    "kitty-badge": "inline-flex items-center gap-1 text-[11px] font-medium text-[#78675A]",
  },
});
