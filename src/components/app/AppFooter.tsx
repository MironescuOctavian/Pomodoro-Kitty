import { t } from "@rimelight/i18n";

export default function AppFooter() {
  return (
    <footer class="app-footer">
      <div class="shell-container">
        <div class="footer-main">
          <div class="footer-brand-card">
            <a class="app-brand" href="/">
              Pomodoro Kitty<span>.</span>
            </a>
            <p>
              Made with care by <a href="https://octavianmironescu.com">Mironescu Octavian</a>.
            </p>
          </div>
          <div class="footer-info-card">
            <strong>Your little space, saved here.</strong>
            <p>Progress stays in this browser. No account needed.</p>
            <span>No streaks. No rush.</span>
          </div>
          <nav class="footer-links" aria-label={t("shell.links")}>
            <a href="https://octavianmironescu.com">
              {t("shell.portfolio")} <span aria-hidden="true">↗</span>
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
