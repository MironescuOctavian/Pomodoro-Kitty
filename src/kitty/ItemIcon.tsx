export const itemCells: Record<string, number> = {
  coins: 0,
  water: 1,
  pencil: 2,
  gift: 3,
  food: 5,
  closet: 6,
  medals: 7,
  bow: 8,
  collar: 9,
  "rose-bow": 10,
  "silk-collar": 11,
  hat: 12,
  "heart-collar": 13,
  flower: 14,
  ribbon: 15,
  "star-hat": 16,
  charm: 17,
  crown: 18,
  "food-0": 19,
  "food-1": 20,
  "food-2": 21,
  "food-3": 22,
  "food-4": 23,
  "food-5": 24,
  "food-6": 25,
  "food-7": 26,
  "food-8": 27,
  book: 28,
  trophy: 29,
};
export default function ItemIcon(props: { item: string }) {
  const cell = () =>
    props.item.startsWith("medal-")
      ? 30 + (Number(props.item.slice(6)) % 6)
      : (itemCells[props.item] ?? 3);
  return (
    <svg
      class="pixel-item-icon"
      viewBox={`${(cell() % 6) * 209} ${Math.floor(cell() / 6) * 209} 209 209`}
      aria-hidden="true"
    >
      <image href="/art/items-atlas.webp" width="1254" height="1254" />
    </svg>
  );
}
