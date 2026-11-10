import { Show } from "solid-js";
import CatSprite from "./CatSprite";
import { useCatBehavior } from "./useCatBehavior";
import type { RoomCat } from "./room";

export default function AnimatedCat(props: {
  bowl?: number;
  waterLabel?: string;
  coat: number;
  head: number;
  neck: number;
  state: string;
  label: string;
  friend?: RoomCat | undefined;
  friendOnline?: boolean;
}) {
  const { behavior, pet } = useCatBehavior(() => ({
    hidden: props.state === "hidden",
    water: props.bowl ?? 0,
    focused: props.state === "focus",
  }));
  const position = () =>
    behavior() === "bed"
      ? { x: 1380, y: 485, width: 280, height: 280 }
      : behavior() === "drink"
        ? { x: 1060, y: 390, width: 320, height: 320 }
        : behavior() === "stretch"
          ? { x: 810, y: 425, width: 350, height: 350 }
          : behavior() === "rest"
            ? { x: 835, y: 450, width: 325, height: 325 }
            : { x: 845, y: 465, width: 310, height: 310 };
  return (
    <Show
      when={props.bowl !== undefined}
      fallback={
        <button type="button" class="cat-alone" aria-label={props.label} onClick={pet}>
          <CatSprite coat={props.coat} head={props.head} neck={props.neck} behavior={behavior()} />
        </button>
      }
    >
      <div class={`cat-scene behavior-${behavior()}`} data-behavior={behavior()}>
        <svg
          class="room-art"
          viewBox="280 0 1410 887"
          role="img"
          aria-label="A cozy pixel-art room with plants, books, a window and a cat resting on her rug"
        >
          <image href="/art/room.webp" width="1774" height="887" />
          <Show when={props.friend}>
            {(friend) => (
              <svg
                class="room-friend"
                x="495"
                y="465"
                width="310"
                height="310"
                viewBox="0 0 810 810"
                overflow="visible"
                opacity={props.friendOnline ? 1 : 0.55}
              >
                <title>
                  {friend().name} · {props.friendOnline ? "focusing with you" : "reconnecting"}
                </title>
                <g transform="translate(810 0) scale(-1 1)">
                  <CatSprite
                    coat={friend().coat}
                    head={friend().head}
                    neck={friend().neck}
                    behavior="idle"
                  />
                </g>
              </svg>
            )}
          </Show>
          <Show when={props.state !== "hidden"}>
            <svg
              class="room-cat"
              x={position().x}
              y={position().y}
              width={position().width}
              height={position().height}
              viewBox="0 0 810 810"
              overflow="visible"
            >
              <CatSprite
                coat={props.coat}
                head={props.head}
                neck={props.neck}
                behavior={behavior()}
              />
            </svg>
          </Show>
        </svg>
        <Show when={props.state !== "hidden"}>
          <button
            type="button"
            class="cat-pet-target"
            aria-label={props.label}
            onClick={pet}
            style={{
              left: `${((position().x - 280) / 1410) * 100}%`,
              top: `${(position().y / 887) * 100}%`,
              width: `${(position().width / 1410) * 100}%`,
              height: `${(position().height / 887) * 100}%`,
            }}
          />
        </Show>
        <span class="sr-only">
          {props.waterLabel}: {props.bowl}/8
        </span>
      </div>
    </Show>
  );
}
