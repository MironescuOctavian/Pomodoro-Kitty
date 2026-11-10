import CatJournal from "./CatJournal";
import Preview from "./Preview";
import MenuHelp from "./MenuHelp";
import { createSignal, Show, For } from "solid-js";
import HelpWindow from "./HelpWindow";
import ProgressSidebar from "./ProgressSidebar";
import GameGuide from "./GameGuide";
import type { Game } from "./game";

export default function DashboardHelp(props: { game: Game }) {
  const [page, setPage] = createSignal<"progress" | "guide" | "journal" | null>(null);
  return (
    <>
      <aside class="dashboard-sidecar">
        <nav class="dashboard-help-dock" aria-label="Dashboard information">
          <button type="button" aria-haspopup="dialog" onClick={() => setPage("progress")}>
            <span aria-hidden="true">✦</span> Your progress
          </button>
          <button type="button" aria-haspopup="dialog" onClick={() => setPage("guide")}>
            <span aria-hidden="true">?</span> How to play
          </button>
          <button type="button" aria-haspopup="dialog" onClick={() => setPage("journal")}>
            <Preview item="book" /> Cat journal
          </button>
        </nav>
        <section class="break-rewards" aria-labelledby="break-rewards-heading">
          <h3 id="break-rewards-heading">Break rewards</h3>
          <For each={["short", "long"] as const}>
            {(mode) => (
              <div class="break-reward-row">
                <Preview item="gift" />
                <div>
                  <div class="break-reward-label">
                    <strong>{mode === "short" ? "Short" : "Long"} break rewards</strong>
                    <span>
                      {props.game[mode]}/{mode === "short" ? 5 : 3}
                    </span>
                  </div>
                  <progress
                    value={props.game[mode]}
                    max={mode === "short" ? 5 : 3}
                    aria-label={mode + " break rewards"}
                  />
                </div>
              </div>
            )}
          </For>
          <MenuHelp title="Break rewards" label="How rewards work">
            <ul>
              <li>
                <strong>Short:</strong> +1 water mark. <strong>Long:</strong> +2 marks.
              </li>
              <li>
                <strong>Rewards:</strong> 1 coin per new mark, plus 4 coins when the 8-mark bowl is
                full.
              </li>
              <li>
                <strong>Daily allowance:</strong> 5 short and 3 long rewarded breaks. The bowl and
                allowance reset at local midnight.
              </li>
            </ul>
            <p>
              Take more breaks whenever you need them. Your cat loses no hearts while you are away.
            </p>
          </MenuHelp>
        </section>
      </aside>
      <HelpWindow
        open={page() !== null}
        title={
          page() === "progress"
            ? "Your progress"
            : page() === "guide"
              ? "How to play"
              : "Cat journal"
        }
        close={() => setPage(null)}
      >
        <Show when={page() === "progress"}>
          <ProgressSidebar game={props.game} expanded />
        </Show>
        <Show when={page() === "guide"}>
          <GameGuide game={props.game} expanded />
        </Show>
        <Show when={page() === "journal"}>
          <CatJournal game={props.game} />
        </Show>
      </HelpWindow>
    </>
  );
}
