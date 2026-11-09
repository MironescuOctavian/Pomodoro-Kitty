import { iconCells, type IconName } from "./icons";
import { iconFrames } from "./iconFrames";

export default function Preview(props: { item: string; color?: string }) {
  const cell = () => iconCells[props.item as IconName] ?? iconCells.medals;
  const frame = () => iconFrames[cell()]!;
  return (
    <span
      class={props.item === "coat" ? "art-preview coat-swatch" : "art-preview icon-tile"}
      aria-hidden="true"
      style={props.item === "coat" ? { background: props.color || "var(--paper)" } : undefined}
    >
      {props.item !== "coat" && (
        <span
          class="pixel-icon"
          style={{
            "background-size": `${frame()[0]}% ${frame()[0]}%`,
            "background-position": `${frame()[1]}% ${frame()[2]}%`,
          }}
        />
      )}
    </span>
  );
}
