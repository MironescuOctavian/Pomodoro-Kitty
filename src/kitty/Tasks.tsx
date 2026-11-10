import { createSignal, For, Show } from "solid-js";
import { t } from "@rimelight/i18n";
import { addTask, toggleTask, type Game } from "./game";
import MenuHelp from "./MenuHelp";

export default function Tasks(props: { game: Game; act: (action: (game: Game) => void) => void }) {
  const [draft, setDraft] = createSignal("");
  const [rewardNotice, setRewardNotice] = createSignal("");
  return (
    <section class="task-section" aria-labelledby="task-heading">
      <div class="task-header">
        <h2 id="task-heading" class="kitty-heading">
          Tasks
          <Show when={props.game.tasks.length > 0}>
            <span class="task-count">
              {props.game.tasks.filter((task) => task.done).length} / {props.game.tasks.length} done
            </span>
          </Show>
        </h2>
        <MenuHelp title="Task rewards" label="Task rewards" class="task-rewards-help">
          <div class="task-reward-explanation">
            <p class="task-reward-balance">
              {props.game.taskClaims >= 3
                ? "Daily task reward limit reached · 3/3 coins"
                : props.game.taskCredits > 0
                  ? `${Math.min(props.game.taskCredits, 3 - props.game.taskClaims)} task coins available · ${props.game.taskClaims}/3 earned today`
                  : `Finish a focus session to unlock task coins · ${props.game.taskClaims}/3 today`}
            </p>
            <p class="kitty-muted">
              Complete a focus session to unlock a task reward. Then check off a new task to earn 1
              coin, up to 3 coins per day. Each task pays once. Tasks completed without a reward
              available do not earn coins later.
            </p>
          </div>
        </MenuHelp>
      </div>
      <ul class="task-list" tabindex="0" aria-label={t("ui.tasks-title")}>
        <Show when={!props.game.tasks.length}>
          <li class="task-empty">What would you like to work on?</li>
        </Show>
        <For each={props.game.tasks} keyed={(task) => task.id}>
          {(task) => (
            <li class={`task-item ${props.game.currentTask === task().id ? "current-task" : ""}`}>
              <label>
                <input
                  type="checkbox"
                  checked={task().done}
                  onChange={() =>
                    props.act((game) => {
                      const reward = toggleTask(game, task().id);
                      const completed = game.tasks.find((item) => item.id === task().id)?.done;
                      setRewardNotice(
                        reward
                          ? "Task complete · earned 1 coin"
                          : completed
                            ? game.taskClaims >= 3
                              ? "Task complete · today's 3-coin limit reached"
                              : "Task complete · no coin earned. Finish a focus session before completing your next task."
                            : "Task reopened · rewards can only be earned once per task",
                      );
                    })
                  }
                />
                <span class={task().done ? "task-done" : ""}>{task().text}</span>
              </label>
              <button
                type="button"
                class="task-select"
                disabled={task().done}
                aria-label={`Focus on: ${task().text}`}
                aria-pressed={props.game.currentTask === task().id ? "true" : "false"}
                onClick={() =>
                  props.act((game) => {
                    game.currentTask = game.currentTask === task().id ? "" : task().id;
                  })
                }
              >
                {props.game.currentTask === task().id ? "Focusing" : "Focus"}
              </button>
              <button
                type="button"
                class="quiet-button task-delete"
                aria-label={`${t("tasks.delete")}: ${task().text}`}
                onClick={() =>
                  props.act((game) => {
                    game.tasks = game.tasks.filter((item) => item.id !== task().id);
                    if (game.currentTask === task().id) game.currentTask = "";
                  })
                }
              >
                ×
              </button>
            </li>
          )}
        </For>
      </ul>
      <div class="task-entry">
        <form
          class="task-form"
          onSubmit={(event) => {
            event.preventDefault();
            props.act((game) => {
              if (addTask(game, draft())) {
                setDraft("");
                setRewardNotice("");
              } else
                setRewardNotice("Use a unique task name and stay within today's 10-task limit.");
            });
          }}
        >
          <label for="new-task" class="sr-only">
            {t("tasks.label")}
          </label>
          <input
            id="new-task"
            maxlength={120}
            value={draft()}
            required
            onInput={(event) => setDraft(event.currentTarget.value)}
            placeholder="Add a task..."
            disabled={props.game.taskAdds >= 10 || props.game.tasks.length >= 30}
          />
          <button
            class="kitty-button kitty-primary"
            aria-label="Add task"
            disabled={!draft().trim() || props.game.taskAdds >= 10 || props.game.tasks.length >= 30}
          >
            +
          </button>
          <span class="task-add-count">{props.game.taskAdds}/10 added today</span>
        </form>
      </div>
      <p class="task-reward-notice" role="status">
        {props.game.taskAdds >= 10
          ? "Today’s 10 tasks are added. You can add more tomorrow."
          : props.game.tasks.length >= 30
            ? t("tasks.limit")
            : rewardNotice()}
      </p>
    </section>
  );
}
