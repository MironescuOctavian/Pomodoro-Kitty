import { t } from "@rimelight/i18n";
import Brand from "./Brand";

export default function AppFooter() {
  return (
    <footer class="app-footer">
      <div class="shell-container">
        <div class="footer-main">
          <div class="footer-about">
            <Brand />
            <div class="footer-credit">
              <span>
                {t("shell.created")} <a href="https://octavianmironescu.com">Octavian Mironescu</a>
              </span>
              <span>© {new Date().getFullYear()} Pomodoro Kitty</span>
            </div>
          </div>
          <div class="footer-privacy">
            <h2>{t("shell.your-space")}</h2>
            <p>{t("shell.local")}</p>
            <span>{t("ui.no-pressure")}</span>
          </div>
          <nav class="footer-links" aria-label={t("shell.links")}>
            <h2>{t("shell.explore")}</h2>
            <a href="https://octavianmironescu.com">
              {t("shell.portfolio")} <span aria-hidden="true">↗</span>
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
