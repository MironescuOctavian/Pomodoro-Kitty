import { getLocaleUrl, t } from "@rimelight/i18n";
import { useHead } from "@solidjs/web";
import AppHeader from "#components/app/AppHeader";

export default function NotFound() {
  useHead(() => [
    { tag: "title", props: { children: `404 | ${t("app.name")}` } },
    { tag: "meta", props: { name: "robots", content: "noindex" } },
  ]);

  return (
    <>
      <AppHeader />
      <section class="workspace">
        <h1>404</h1>
        <p>{t("app.not-found")}</p>
        <a href={getLocaleUrl("/")}>{t("app.back-home")}</a>
      </section>
    </>
  );
}
