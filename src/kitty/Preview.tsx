import { coatCatalog, coatFrame } from "./coats";
import { Show } from "solid-js";
import ItemIcon from "./ItemIcon";

export default function Preview(props: { item: string; color?: string }) {
  const coat = () => coatCatalog.findIndex((entry) => entry.swatch === props.color);
  return (
    <span
      class={props.item === "coat" ? "art-preview coat-swatch" : "art-preview icon-tile"}
      data-artwork={props.item}
      aria-hidden="true"
    >
      <Show
        when={props.item !== "coat"}
        fallback={
          <span class="pixel-item-icon coat-portrait">
            <img
              src={coatFrame(Math.max(0, coat())).src}
              width="1296"
              height="1213"
              loading="lazy"
              decoding="async"
              alt=""
            />
          </span>
        }
      >
        <ItemIcon item={props.item} />
      </Show>
    </span>
  );
}
