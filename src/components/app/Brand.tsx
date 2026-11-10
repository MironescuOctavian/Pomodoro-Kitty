import { getLocaleUrl, t } from "@rimelight/i18n";
import { useParams } from "@solidjs/router";

export default function Brand() {
  const params = useParams();
  return (
    <a href={getLocaleUrl("/", params["locale"])} class="app-brand" aria-label={t("app.name")}>
      <svg class="brand-cat" viewBox="250 200 810 810" aria-hidden="true">
        <image href="/art/companion.webp" width="1296" height="1213" />
      </svg>
      <span>
        {t("app.name")}
        <span class="brand-dot" aria-hidden="true">
          .
        </span>
      </span>
    </a>
  );
}
