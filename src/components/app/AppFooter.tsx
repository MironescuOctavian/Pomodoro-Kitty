import { getLocaleUrl, t } from "@rimelight/i18n";
import LanguageSelector from "./LanguageSelector";

export default function AppFooter() {
  return (
    <footer class="app-footer">
      <div class="shell-container">
        <div class="footer-main">
          <div class="footer-brand-card">
            <a class="app-brand" href={getLocaleUrl("/")}>
              Pomodoro Kitty<span>.</span>
            </a>
            <p>
              {t("shell.created")} <a href="https://octavianmironescu.com">Mironescu Octavian</a>.
            </p>
          </div>
          <div class="footer-info-card">
            <strong>{t("shell.your-space")}</strong>
            <p>{t("shell.local")}</p>
            <span>{t("shell.footer-tagline")}</span>
          </div>
          <nav class="footer-links" aria-label={t("shell.links")}>
            <LanguageSelector variant="footer" />
            <a href="https://octavianmironescu.com">
              {t("shell.portfolio")} <span aria-hidden="true">↗</span>
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
