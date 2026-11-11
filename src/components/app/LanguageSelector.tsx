import { createSignal, onSettled, For, Show } from "solid-js";
import { useLocation } from "@solidjs/router";
import { getLocaleInfo, getLocaleUrl, getLocales, setCurrentLocale, t } from "@rimelight/i18n";
import { useLocale } from "@rimelight/i18n/solid";

interface LanguageSelectorProps {
  variant?: "header" | "footer";
}

const PREFERRED_ORDER = ["en", "ro", "pt", "es", "fr", "de", "ja", "zh", "hi", "ar"];

export default function LanguageSelector(props: LanguageSelectorProps) {
  const [open, setOpen] = createSignal(false);
  const locale = useLocale();
  const location = useLocation();
  let containerRef: HTMLDivElement | undefined;

  const locales = () => {
    const all = getLocales();
    return [...all].sort((a, b) => {
      const idxA = PREFERRED_ORDER.indexOf(a);
      const idxB = PREFERRED_ORDER.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });
  };

  const currentInfo = () => getLocaleInfo(locale());

  const switchLocale = (code: string) => {
    setOpen(false);
    setCurrentLocale(code);
    const info = getLocaleInfo(code);
    if (typeof document !== "undefined") {
      document.documentElement.lang = info.tag;
      document.documentElement.dir = info.dir;
    }
  };

  onSettled(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef && !containerRef.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div
      ref={(el) => {
        containerRef = el;
      }}
      class={`language-selector ${props.variant === "footer" ? "language-selector-footer" : "language-selector-header"}`}
    >
      <button
        type="button"
        class="language-toggle kitty-button"
        aria-expanded={open() ? "true" : "false"}
        aria-haspopup="true"
        aria-label={t("shell.language")}
        onClick={() => setOpen((prev) => !prev)}
      >
        <svg
          class="language-icon"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
        <span>{currentInfo().label}</span>
        <svg
          class={`language-chevron ${open() ? "open" : ""}`}
          viewBox="0 0 12 12"
          width="10"
          height="10"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d={props.variant === "footer" ? "m2 8 4-4 4 4" : "m2 4 4 4 4-4"} />
        </svg>
      </button>

      <Show when={open()}>
        <div
          class={`language-menu ${props.variant === "footer" ? "language-menu-up" : "language-menu-down"}`}
          role="menu"
          aria-label={t("shell.language")}
        >
          <For each={locales()}>
            {(code) => {
              const info = getLocaleInfo(code);
              const isCurrent = () => locale() === code;
              return (
                <a
                  href={getLocaleUrl(location.pathname, code)}
                  class="language-option"
                  role="menuitem"
                  aria-current={isCurrent() ? "true" : undefined}
                  onClick={() => switchLocale(code)}
                >
                  <span class="language-name">{info.label}</span>
                  <Show when={isCurrent()}>
                    <span class="language-option-check" aria-hidden="true">
                      ✓
                    </span>
                  </Show>
                </a>
              );
            }}
          </For>
        </div>
      </Show>
    </div>
  );
}
