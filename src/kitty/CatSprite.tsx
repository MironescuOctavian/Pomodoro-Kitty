import { createUniqueId, For, Show } from "solid-js";
import { accessories, type Accessory } from "./accessories";
import { itemCells } from "./ItemIcon";
import { HEART_PATH } from "./StatusHearts";
import type { CatBehavior } from "./behaviors";
import SittingArt, { CoatFrame } from "./CoatArt";

function WornItem(props: { item: Accessory; pose: CatBehavior }) {
  const anchor = () => {
    if (props.pose === "bed") {
      if (props.item.slot === "neck") return [150, 520, 230, 150];
      if (props.item.kind === "bow") return [75, 165, 150, 150];
      if (props.item.kind === "flowers") return [100, 175, 320, 145];
      return [150, 70, 270, 230];
    }
    if (props.pose === "stretch") {
      if (props.item.slot === "neck") return [145, 445, 230, 150];
      if (props.item.kind === "bow") return [65, 140, 150, 150];
      if (props.item.kind === "flowers") return [65, 155, 320, 145];
      return [90, 40, 270, 230];
    }
    const drinking = props.pose === "drink";
    const lying = props.pose === "rest";
    if (props.item.slot === "neck")
      return drinking ? [310, 465, 230, 150] : lying ? [170, 405, 230, 150] : [205, 415, 265, 155];
    if (props.item.kind === "bow")
      return drinking ? [345, 180, 150, 150] : lying ? [100, 85, 150, 150] : [80, 35, 150, 150];
    if (props.item.kind === "flowers")
      return drinking ? [345, 185, 290, 130] : lying ? [100, 85, 320, 145] : [100, 45, 340, 150];
    return drinking ? [365, 80, 270, 230] : lying ? [125, -15, 270, 230] : [180, -85, 280, 240];
  };
  const cell = () => itemCells[props.item.art] ?? 8;
  return (
    <svg
      class={`equipped-accessory accessory-${props.item.art}`}
      data-accessory={props.item.art}
      x={anchor()[0]}
      y={anchor()[1]}
      width={anchor()[2]}
      height={anchor()[3]}
      viewBox={`${(cell() % 6) * 209} ${Math.floor(cell() / 6) * 209} 209 209`}
      preserveAspectRatio="none"
    >
      <image href="/art/items-atlas.webp" width="1254" height="1254" />
    </svg>
  );
}

export default function CatSprite(props: {
  coat: number;
  head: number;
  neck: number;
  behavior: CatBehavior;
}) {
  const id = createUniqueId();
  const posed = () => ["rest", "bed", "stretch", "drink"].includes(props.behavior);
  const worn = () =>
    accessories.filter((item) =>
      item.slot === "head" ? item.id === props.head : item.id === props.neck,
    );
  return (
    <svg
      class="cat-sprite"
      viewBox="0 0 810 810"
      overflow="visible"
      aria-hidden="true"
      data-pose={props.behavior}
    >
      <Show
        when={posed()}
        fallback={
          <svg viewBox="250 200 810 810" width="810" height="810" overflow="visible">
            <defs>
              <mask
                id={`${id}-body`}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="1296"
                height="1213"
              >
                <rect width="1296" height="1213" fill="white" />
                <rect x="300" y="200" width="180" height="140" fill="black" />
                <rect x="650" y="200" width="180" height="140" fill="black" />
                <path d="M890 580H1070V1010H890V920H920V750H890Z" fill="black" />
              </mask>
              <clipPath id={`${id}-ear-left`}>
                <rect x="300" y="200" width="180" height="140" />
              </clipPath>
              <clipPath id={`${id}-ear-right`}>
                <rect x="650" y="200" width="180" height="140" />
              </clipPath>
              <clipPath id={`${id}-tail`}>
                <path d="M890 580H1070V1010H890V920H920V750H890Z" />
              </clipPath>
            </defs>
            <g>
              <g mask={`url(#${id}-body)`}>
                <SittingArt coat={props.coat} />
              </g>
              <g class="cat-ear cat-ear-left" clip-path={`url(#${id}-ear-left)`}>
                <SittingArt coat={props.coat} />
              </g>
              <g class="cat-ear cat-ear-right" clip-path={`url(#${id}-ear-right)`}>
                <SittingArt coat={props.coat} />
              </g>
              <g class="cat-tail" clip-path={`url(#${id}-tail)`}>
                <SittingArt coat={props.coat} />
              </g>
            </g>
            <Show when={props.behavior === "meow"}>
              <path
                class="cat-mouth"
                d="M520 532h42v42h-42Z"
                fill="#8f4141"
                shape-rendering="crispEdges"
              />
              <path d="M527 558h28v15h-28Z" fill="#dc8b83" />
            </Show>
            <Show when={props.behavior === "pet"}>
              <g class="cat-blush" fill="#df8a83" opacity=".8" shape-rendering="crispEdges">
                <path d="M328 547h65v28h-65ZM712 547h65v28h-65Z" />
              </g>
            </Show>
          </svg>
        }
      >
        <CoatFrame coat={props.coat} pose={props.behavior} />
      </Show>
      <For each={worn()} keyed={(item) => item.id}>
        {(item) => (
          <g class={item().kind === "bow" ? "cat-ear-accessory" : undefined}>
            <WornItem item={item()} pose={props.behavior} />
          </g>
        )}
      </For>
      <Show when={props.behavior === "pet"}>
        <For each={[0, 1, 2, 3, 4]}>
          {(index) => (
            <svg
              class={`pet-heart pet-heart-${index}`}
              x={90 + index * 105}
              y={110 + (index % 2) * 50}
              width="120"
              height="108"
              viewBox="-1 0 18 16"
              shape-rendering="crispEdges"
            >
              <path d={HEART_PATH} fill={index % 2 ? "#ec8f8c" : "#e94d4b"} />
              <path d="M3 3h3v2H3Z" fill="#fff2c7" />
            </svg>
          )}
        </For>
      </Show>
      <Show when={props.behavior === "meow"}>
        <text class="cat-mew" x="460" y="50" font-size="60" fill="#b77e2d">
          mew
        </text>
      </Show>
    </svg>
  );
}
