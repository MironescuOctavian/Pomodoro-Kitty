import { For } from "solid-js";
import { durations, type Game } from "./game";

export default function TodayFocus(props: {
  game: Game;
  act: (action: (game: Game) => void) => void;
}) {
  return (
    <section class="today-focus" aria-labelledby="today-heading">
      <h2 id="today-heading">Today's focus</h2>
      <div class="focus-metrics">
        <div>
          <strong>{(props.game.todaySessions * durations.focus) / 60} min</strong>
          <span>focused</span>
        </div>
        <div>
          <strong>{props.game.todaySessions}</strong>
          <span>sessions</span>
        </div>
        <div>
          <strong>{props.game.todayTasks}</strong>
          <span>tasks done</span>
        </div>
      </div>
      <div class="daily-goal">
        <span>
          <strong>Daily goal:</strong> {props.game.todaySessions} of {props.game.dailyGoal} sessions
        </span>
        <label class="goal-picker">
          <span class="sr-only">Daily session goal</span>
          <select
            value={props.game.dailyGoal}
            onChange={(event) => {
              const goal = Number(event.currentTarget.value);
              if (goal === 2 || goal === 4 || goal === 6)
                props.act((game) => {
                  game.dailyGoal = goal;
                });
            }}
          >
            <option value="2">2 sessions</option>
            <option value="4">4 sessions</option>
            <option value="6">6 sessions</option>
          </select>
        </label>
        <div
          class="goal-segments"
          role="progressbar"
          aria-label="Daily focus goal"
          aria-valuemin={0}
          aria-valuemax={props.game.dailyGoal}
          aria-valuenow={Math.min(props.game.dailyGoal, props.game.todaySessions)}
        >
          <For each={Array.from({ length: props.game.dailyGoal }, (_, i) => i + 1)}>
            {(step) => <span class={props.game.todaySessions >= step ? "filled" : ""} />}
          </For>
        </div>
      </div>
    </section>
  );
}
