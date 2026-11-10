import { createSignal, onSettled } from "solid-js";

export default function ThemeToggle() {
  const [night, setNight] = createSignal(false);
  const apply = (enabled: boolean) => {
    document.documentElement.dataset["theme"] = enabled ? "night" : "day";
    setNight(enabled);
  };
  onSettled(() => {
    try {
      apply(localStorage.getItem("kitty-theme") === "night");
    } catch {
      /* Theme works without storage. */
    }
  });
  return (
    <button
      type="button"
      class="theme-toggle kitty-button"
      aria-pressed={night() ? "true" : "false"}
      aria-label={night() ? "Switch to day mode" : "Switch to night mode"}
      onClick={() => {
        const enabled = !night();
        apply(enabled);
        try {
          localStorage.setItem("kitty-theme", enabled ? "night" : "day");
        } catch {
          /* Keep the current session's choice. */
        }
      }}
    >
      {night() ? "Day mode" : "Night mode"}
    </button>
  );
}
