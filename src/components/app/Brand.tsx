import { getLocaleUrl, t } from "@rimelight/i18n";
import { useParams } from "@solidjs/router";

export default function Brand() {
  const params = useParams();
  return (
    <a href={getLocaleUrl("/", params["locale"])} class="app-brand" aria-label={t("app.name")}>
      <span
        class="h-8 w-8 shrink-0 rounded-lg border border-dashed border-[var(--rule)] bg-[var(--paper)]"
        aria-hidden="true"
      />
      <span>
        {t("app.name")}
        <span class="brand-dot" aria-hidden="true">
          .
        </span>
      </span>
    </a>
  );
}
