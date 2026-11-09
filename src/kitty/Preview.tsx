import { coatCatalog } from "./coats";

export default function Preview(props: { item: string; color?: string }) {
  const coat = () => coatCatalog.findIndex((entry) => entry.swatch === props.color);
  return (
    <span
      class={
        props.item === "coat"
          ? `art-preview coat-swatch coat-preview-${coat()}`
          : "art-preview icon-tile artwork-slot"
      }
      data-artwork={props.item}
      aria-hidden="true"
    ></span>
  );
}
