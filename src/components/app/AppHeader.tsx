import { t } from "@rimelight/i18n";
import Brand from "./Brand";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";

export default function AppHeader() {
  return (
    <header class="app-header">
      <div class="shell-container header-inner">
        <Brand />
        <button type="button" class="kitty-button friends-placeholder" disabled title="Coming soon">
          Focus with a friend <span>Coming soon</span>
        </button>
        <nav class="header-actions" aria-label={t("shell.links")}>
          <LanguageSelector variant="header" />
          <ThemeToggle />
          <a class="shell-contact" href="https://octavianmironescu.com/en/contact">
            {t("shell.contact")}
          </a>
        </nav>
      </div>
    </header>
  );
}
