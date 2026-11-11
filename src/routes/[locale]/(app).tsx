import type { RouteSectionProps } from "@solidjs/router";
import { createEffect } from "solid-js";
import { useParams } from "@solidjs/router";
import { getLocaleInfo, setCurrentLocale } from "@rimelight/i18n";
import AppFooter from "#components/app/AppFooter";

export default function AppRouteLayout(props: RouteSectionProps) {
  const params = useParams();
  createEffect(
    () => params["locale"],
    (loc) => {
      if (loc) {
        setCurrentLocale(loc);
        if (typeof document !== "undefined") {
          const info = getLocaleInfo(loc);
          document.documentElement.lang = info.tag;
          document.documentElement.dir = info.dir;
        }
      }
    },
  );

  return (
    <div class="app-shell">
      <a
        href="#main-content"
        class="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-[#fff0c6] focus:p-3"
      >
        Skip to content
      </a>
      <main id="main-content" class="flex-1">
        {props.children}
      </main>
      <AppFooter />
    </div>
  );
}
