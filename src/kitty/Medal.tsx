import Preview from "./Preview";

export default function Medal(props: { level: number }) {
  return (
    <span class="medal-icon" data-level={props.level}>
      <Preview item={`medal-${props.level}`} />
    </span>
  );
}
