import { For } from "solid-js";
export const HEART_PATH = "M2 1h4v2h4V1h4v2h2v5h-2v2h-2v2h-2v2H6v-2H4v-2H2V8H0V3h2Z";
const shape = HEART_PATH;

function Heart(props: { amount: number; gold?: boolean }) {
  return (
    <svg
      viewBox="-1 0 18 16"
      width="24"
      height="22"
      shape-rendering="crispEdges"
      aria-hidden="true"
    >
      <path d={shape} fill="none" stroke={props.gold ? "#cfa64a" : "#c46254"} stroke-width="1" />
      <path
        d={shape}
        fill={props.gold ? "#f2b625" : "#e94d4b"}
        style={{
          "clip-path": `inset(0 ${100 - Math.max(0, Math.min(1, props.amount)) * 100}% 0 0)`,
        }}
      />
      <path d="M3 3h3v2H3Z" fill={props.amount > 0 ? "#fff2c7" : "none"} />
    </svg>
  );
}

export default function StatusHearts(props: { health: number; bonus: number }) {
  return (
    <span class="health-hud">
      <span class="pixel-hearts">
        <For each={[0, 1, 2]}>{(heart) => <Heart amount={(props.health - heart * 2) / 2} />}</For>
      </span>
      <span class="bonus-hearts-row">
        <For each={[0, 1, 2, 3, 4, 5]}>
          {(heart) => <Heart gold amount={(props.bonus - heart * 2) / 2} />}
        </For>
      </span>
      <span class="sr-only">
        {props.health / 2} of 3 hearts, {props.bonus / 2} of 6 bonus hearts
      </span>
    </span>
  );
}
