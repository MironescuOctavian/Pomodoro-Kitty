export const accessories = [
  { id: 1, slot: "head", art: "bow", kind: "bow" },
  { id: 2, slot: "neck", art: "collar", kind: "collar" },
  { id: 3, slot: "head", art: "rose-bow", kind: "bow" },
  { id: 4, slot: "neck", art: "silk-collar", kind: "collar" },
  { id: 5, slot: "head", art: "hat", kind: "hat" },
  { id: 6, slot: "neck", art: "heart-collar", kind: "collar" },
  { id: 7, slot: "head", art: "flower", kind: "flowers" },
  { id: 8, slot: "neck", art: "ribbon", kind: "ribbon" },
  { id: 9, slot: "head", art: "star-hat", kind: "hat" },
  { id: 10, slot: "neck", art: "charm", kind: "collar" },
  { id: 11, slot: "head", art: "crown", kind: "hat" },
] as const;
export type Accessory = (typeof accessories)[number];
