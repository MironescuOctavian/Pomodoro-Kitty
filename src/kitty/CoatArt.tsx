import type { CatBehavior } from "./behaviors";
import { coatFrame } from "./coats";

export function CoatFrame(props: { coat: number; pose?: CatBehavior }) {
  const frame = () => coatFrame(props.coat, props.pose);
  return (
    <svg
      width="810"
      height="810"
      viewBox={frame().viewBox}
      preserveAspectRatio="xMidYMax meet"
      overflow="hidden"
    >
      <image
        href={frame().src}
        width={frame().width}
        height={frame().height}
        preserveAspectRatio="none"
      />
    </svg>
  );
}

/** Every coat uses the original sitting canvas, so ears, tail and accessories stay aligned. */
export default function SittingArt(props: { coat: number }) {
  return <image href={coatFrame(props.coat).src} width="1296" height="1213" />;
}
