import { getLocaleUrl, t } from "@rimelight/i18n";
import { useParams } from "@solidjs/router";

export default function Brand() {
  const params = useParams();
  return (
    <a href={getLocaleUrl("/", params["locale"])} class="app-brand" aria-label={t("app.name")}>
      <svg class="brand-paw" viewBox="0 0 32 32" aria-hidden="true">
        <ellipse cx="6" cy="12" rx="3.5" ry="4.5" transform="rotate(-25 6 12)" />
        <ellipse cx="12.5" cy="6.5" rx="3.5" ry="4.5" transform="rotate(-8 12.5 6.5)" />
        <ellipse cx="21" cy="7" rx="3.5" ry="4.5" transform="rotate(12 21 7)" />
        <ellipse cx="27" cy="13" rx="3.5" ry="4.5" transform="rotate(28 27 13)" />
        <path d="M16 14c-4 0-5 4-8 7-3 4-1 9 3 9 2 0 3-1 5-1s3 1 5 1c5 0 7-5 4-9-3-3-5-7-9-7Z" />
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
