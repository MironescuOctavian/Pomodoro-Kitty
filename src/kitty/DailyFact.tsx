import { t } from "@rimelight/i18n";
import { createSignal } from "solid-js";
import { factForDay } from "./facts";

export default function DailyFact(props: { day: string }) {
  const [offset, setOffset] = createSignal(0);
  const fact = () => factForDay(props.day, offset());
  return (
    <section class="daily-fact-section" aria-labelledby="daily-fact-title">
      <div class="daily-fact">
        <div class="fact-title">
          <span class="fact-art-placeholder" aria-hidden="true" />
          <h2 id="daily-fact-title">{t("ui.fact-title")}</h2>
        </div>
        <div class="fact-copy">
          <p class="fact-text" aria-live="polite" aria-atomic="true">
            {fact().text}
          </p>
          <a class="fact-source" href={fact().url} target="_blank" rel="noreferrer">
            {t("ui.fact-source")}: {fact().source} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <button type="button" class="fact-next" onClick={() => setOffset((value) => value + 1)}>
          {t("ui.another-fact")}
        </button>
      </div>
    </section>
  );
}
