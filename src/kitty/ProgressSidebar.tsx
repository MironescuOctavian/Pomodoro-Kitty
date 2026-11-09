import { onSettled } from "solid-js";
import { coatCatalog } from "./coats";
import { durations, milestones, type Game } from "./game";
import SessionHistory from "./SessionHistory";
import CatJournal from "./CatJournal";

export default function ProgressSidebar(props: { game: Game }) {
  let disclosure!: HTMLDetailsElement;
  onSettled(() => {
    const wide = matchMedia("(min-width: 1884px) and (min-height: 740px)");
    const small = matchMedia("(max-width: 1199px)");
    const sync = () => {
      disclosure.open = wide.matches || small.matches;
    };
    sync();
    wide.addEventListener("change", sync);
    small.addEventListener("change", sync);
    return () => {
      wide.removeEventListener("change", sync);
      small.removeEventListener("change", sync);
    };
  });
  return (
    <aside class="progress-sidebar" aria-label="Your progress">
      <details
        ref={(el) => {
          disclosure = el;
        }}
        class="progress-disclosure"
      >
        <summary>Your progress</summary>
        <div class="progress-panels">
          <section class="lifetime-tracker" aria-labelledby="lifetime-title">
            <header>
              <h2 id="lifetime-title">Your journey</h2>
              <p>Little steps, lasting progress.</p>
            </header>
            <div class="lifetime-hours">
              <strong>
                {((props.game.sessions * durations.focus) / 3600).toLocaleString(undefined, {
                  maximumFractionDigits: 1,
                })}
              </strong>
              <span>hours focused</span>
            </div>
            <dl class="lifetime-metrics">
              <div>
                <dt>Focus sessions</dt>
                <dd>{props.game.sessions}</dd>
              </div>
              <div>
                <dt>Tasks done</dt>
                <dd>{props.game.totalTasks}</dd>
              </div>
              <div>
                <dt>Breaks taken</dt>
                <dd>{props.game.totalBreaks}</dd>
              </div>
              <div>
                <dt>Care feeds</dt>
                <dd>{props.game.feeds}</dd>
              </div>
              <div>
                <dt>Coats collected</dt>
                <dd>
                  {new Set(props.game.owned).size}
                  <small>/{coatCatalog.length}</small>
                </dd>
              </div>
              <div>
                <dt>Medals earned</dt>
                <dd>
                  {milestones.filter((count) => props.game.feeds >= count).length}
                  <small>/{milestones.length}</small>
                </dd>
              </div>
            </dl>
            <p class="tracker-note">
              Task and break totals include available saved history, then track every new
              completion.
            </p>
          </section>
          <SessionHistory game={props.game} />
          <CatJournal game={props.game} />
        </div>
      </details>
    </aside>
  );
}
