import type { RouteSectionProps } from "@solidjs/router";
import AppFooter from "#components/app/AppFooter";

export default function AppRouteLayout(props: RouteSectionProps) {
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
