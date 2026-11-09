import { pageRoutes } from "virtual:file-routes";
import { fileRoutes } from "@solidjs/router/fs";
import { createRouter } from "@solidjs/router";
import { RLI18n } from "@rimelight/i18n/solid";
import { Loading } from "solid-js";
import CompanionLoading from "#kitty/CompanionLoading";

const Router = createRouter({ routes: fileRoutes(pageRoutes) });

export default function App() {
  return (
    <Router>
      {(props) => (
        <Loading
          fallback={
            <main class="initial-loading">
              <CompanionLoading
                title="Preparing your little companion…"
                subtitle="Making a cozy spot for you both."
              />
            </main>
          }
        >
          <RLI18n pathname={props.location.pathname}>{props.children}</RLI18n>
        </Loading>
      )}
    </Router>
  );
}
