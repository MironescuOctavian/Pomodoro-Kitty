import { For, Show } from "solid-js";
import { durations, type Game } from "./game";

export default function SessionHistory(props: { game: Game }) {
  return (
    <section class="session-history" aria-labelledby="history-title">
      <header>
        <h3 id="history-title">Today's sessions</h3>
        <span>{props.game.sessionHistory.length} completed</span>
      </header>
      <Show
        when={props.game.sessionHistory.length}
        fallback={
          <p class="history-empty">Your completed focus sessions and breaks will appear here.</p>
        }
      >
        <ol class="history-list" tabindex="0" aria-label="Completed sessions, newest first">
          <For
            each={[...props.game.sessionHistory].reverse()}
            keyed={(entry) => `${entry.mode}-${entry.completedAt}`}
          >
            {(entry) => (
              <li>
                <span class={`history-dot ${entry().mode}`} aria-hidden="true" />
                <div>
                  <strong>
                    {entry().mode === "focus"
                      ? "Focus session"
                      : entry().mode === "short"
                        ? "Short break"
                        : "Long break"}
                  </strong>
                  <small>{durations[entry().mode] / 60} min completed</small>
                </div>
                <time datetime={new Date(entry().completedAt).toISOString()}>
                  {new Date(entry().completedAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </li>
            )}
          </For>
        </ol>
      </Show>
    </section>
  );
}
