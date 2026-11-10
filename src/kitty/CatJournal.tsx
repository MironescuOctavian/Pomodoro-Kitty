import { For, Show } from "solid-js";
import type { Game } from "./game";

export default function CatJournal(props: { game: Game }) {
  return (
    <section class="cat-journal" aria-labelledby="journal-title">
      <header>
        <h3 id="journal-title">Cat journal</h3>
        <span>Your latest 40 little moments together</span>
      </header>
      <Show
        when={props.game.journal.length}
        fallback={
          <p class="journal-empty">
            A new little chapter awaits. Meals, milestones and new outfits will find a home here.
          </p>
        }
      >
        <ol class="journal-list" tabindex="0" aria-label="Cat journal, newest first">
          <For each={[...props.game.journal].reverse()} keyed={(entry) => entry.id}>
            {(entry) => (
              <li class={`journal-entry journal-${entry().kind}`}>
                <span class="journal-mark" aria-hidden="true" />
                <div>
                  <p>{entry().text}</p>
                  <time datetime={new Date(entry().at).toISOString()}>
                    {new Date(entry().at).toLocaleString([], {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                </div>
              </li>
            )}
          </For>
        </ol>
      </Show>
    </section>
  );
}
