import type { CatBehavior } from "./behaviors";
import { poseSizes } from "./poseSizes.ts";

export function coatFrame(coat: number, pose: CatBehavior = "idle") {
  const index = Number.isFinite(coat)
    ? Math.max(0, Math.min(coatCatalog.length - 1, Math.trunc(coat)))
    : 0;
  const posed = ["rest", "stretch", "drink", "bed"].includes(pose);
  if (!posed)
    return {
      src: index === 0 ? "/art/companion.webp" : `/art/coats/${index}-sitting.webp`,
      viewBox: "250 200 810 810",
      width: 1296,
      height: 1213,
    };
  const column = pose === "stretch" || pose === "bed" ? 1 : 0;
  const row = pose === "drink" || pose === "bed" ? 1 : 0;
  const [width, height] = poseSizes[index]!;
  return {
    src: `/art/coats/${index}-poses.webp`,
    viewBox: `${(column * width) / 2} ${(row * height) / 2} ${width / 2} ${height / 2}`,
    width,
    height,
  };
}

// Catalog v2: twelve domestic coats and twelve wild-inspired end-game coats.
export const coatCatalog = [
  {
    name: "Ginger tabby",
    description: "Warm orange · striped",
    price: 0,
    swatch:
      "repeating-linear-gradient(115deg, transparent 0 7px, #a4612d 8px 11px, transparent 12px 18px), linear-gradient(#dda266, #dda266)",
  },
  {
    name: "Snow white",
    description: "Soft white · solid",
    price: 0,
    swatch: "#f3efe5",
  },
  {
    name: "Blue gray",
    description: "Cool slate · solid",
    price: 0,
    swatch: "#92999e",
  },
  {
    name: "Midnight black",
    description: "Deep charcoal · solid",
    price: 12,
    swatch: "#30302f",
  },
  {
    name: "Silver tabby",
    description: "Pale silver · charcoal stripes",
    price: 24,
    swatch:
      "repeating-linear-gradient(115deg, transparent 0 7px, #666b68 8px 11px, transparent 12px 18px), linear-gradient(#d3d4cf, #d3d4cf)",
  },
  {
    name: "Tuxedo",
    description: "Black coat · white bib",
    price: 36,
    swatch: "radial-gradient(ellipse at 50% 100%, #f6f0e4 0 32%, transparent 34%), #282929",
  },
  {
    name: "Classic tabby",
    description: "Dark whorls · brown coat",
    price: 48,
    swatch:
      "repeating-radial-gradient(ellipse at 20% 60%, #b49a72 0 5px, #5d4a35 7px 10px, #b49a72 12px 17px)",
  },
  {
    name: "Tortoiseshell",
    description: "Black coat · ginger patches",
    price: 64,
    swatch:
      "radial-gradient(ellipse at 25% 30%, #c58341 0 12%, transparent 14%), radial-gradient(ellipse at 75% 65%, #c58341 0 14%, transparent 16%), radial-gradient(ellipse at 65% 15%, #c58341 0 8%, transparent 10%), linear-gradient(#34302b, #34302b)",
  },
  {
    name: "Calico",
    description: "White · ginger & black patches",
    price: 80,
    swatch:
      "radial-gradient(ellipse at 20% 25%, #cb8d4d 0 26%, transparent 28%), radial-gradient(ellipse at 80% 65%, #34302c 0 28%, transparent 30%), #f1ecdf",
  },
  {
    name: "Seal point",
    description: "Ivory coat · dark brown points",
    price: 100,
    swatch: "radial-gradient(ellipse at center, #eadac0 20%, #543d30 100%)",
  },
  {
    name: "Flame point",
    description: "Cream coat · orange points",
    price: 125,
    swatch: "radial-gradient(ellipse at center, #f2e9d8 20%, #d5985c 100%)",
  },
  {
    name: "Black smoke",
    description: "Silvery roots · dark tips",
    price: 150,
    swatch: "linear-gradient(135deg, #dedcd4, #686864 50%, #292a29)",
  },
  {
    name: "Sand cat",
    description: "Wild-inspired · sandy stripes",
    price: 220,
    swatch:
      "repeating-linear-gradient(115deg, transparent 0 7px, #a58b61 8px 11px, transparent 12px 18px), linear-gradient(#decba1, #decba1)",
    wild: true,
  },
  {
    name: "Lynx",
    description: "Wild-inspired · tawny flecks",
    price: 280,
    swatch:
      "radial-gradient(ellipse at 25% 30%, #67584a 0 12%, transparent 14%), radial-gradient(ellipse at 75% 65%, #67584a 0 14%, transparent 16%), radial-gradient(ellipse at 65% 15%, #67584a 0 8%, transparent 10%), linear-gradient(#b7a38a, #b7a38a)",
    wild: true,
  },
  {
    name: "Bobcat",
    description: "Wild-inspired · russet spots",
    price: 340,
    swatch:
      "radial-gradient(ellipse at 25% 30%, #6b5039 0 12%, transparent 14%), radial-gradient(ellipse at 75% 65%, #6b5039 0 14%, transparent 16%), radial-gradient(ellipse at 65% 15%, #6b5039 0 8%, transparent 10%), linear-gradient(#bf9870, #bf9870)",
    wild: true,
  },
  {
    name: "Caracal",
    description: "Wild-inspired · rich tawny",
    price: 400,
    swatch: "linear-gradient(135deg, #d2a878, #a56c41)",
    wild: true,
  },
  {
    name: "Serval",
    description: "Wild-inspired · bold black spots",
    price: 480,
    swatch:
      "radial-gradient(ellipse at 25% 30%, #302d25 0 12%, transparent 14%), radial-gradient(ellipse at 75% 65%, #302d25 0 14%, transparent 16%), radial-gradient(ellipse at 65% 15%, #302d25 0 8%, transparent 10%), linear-gradient(#d4b373, #d4b373)",
    wild: true,
  },
  {
    name: "Ocelot",
    description: "Wild-inspired · elongated rosettes",
    price: 560,
    swatch:
      "radial-gradient(ellipse at 30% 30%, transparent 0 8%, #49392a 9% 15%, transparent 17%), radial-gradient(ellipse at 75% 70%, transparent 0 9%, #49392a 10% 17%, transparent 19%), linear-gradient(#c5a370, #c5a370)",
    wild: true,
  },
  {
    name: "Cheetah",
    description: "Wild-inspired · small dark spots",
    price: 650,
    swatch:
      "radial-gradient(ellipse at 25% 30%, #36312a 0 12%, transparent 14%), radial-gradient(ellipse at 75% 65%, #36312a 0 14%, transparent 16%), radial-gradient(ellipse at 65% 15%, #36312a 0 8%, transparent 10%), linear-gradient(#d3b479, #d3b479)",
    wild: true,
  },
  {
    name: "Leopard",
    description: "Wild-inspired · golden rosettes",
    price: 760,
    swatch:
      "radial-gradient(ellipse at 30% 30%, transparent 0 8%, #473426 9% 15%, transparent 17%), radial-gradient(ellipse at 75% 70%, transparent 0 9%, #473426 10% 17%, transparent 19%), linear-gradient(#cda55e, #cda55e)",
    wild: true,
  },
  {
    name: "Jaguar",
    description: "Wild-inspired · bold rosettes",
    price: 880,
    swatch:
      "radial-gradient(ellipse at 30% 30%, transparent 0 8%, #302b23 9% 15%, transparent 17%), radial-gradient(ellipse at 75% 70%, transparent 0 9%, #302b23 10% 17%, transparent 19%), linear-gradient(#c69c50, #c69c50)",
    wild: true,
  },
  {
    name: "Snow leopard",
    description: "Wild-inspired · silver rosettes",
    price: 1000,
    swatch:
      "radial-gradient(ellipse at 30% 30%, transparent 0 8%, #6b6b63 9% 15%, transparent 17%), radial-gradient(ellipse at 75% 70%, transparent 0 9%, #6b6b63 10% 17%, transparent 19%), linear-gradient(#dbd8cc, #dbd8cc)",
    wild: true,
  },
  {
    name: "Tiger",
    description: "Wild-inspired · amber & black stripes",
    price: 1150,
    swatch:
      "repeating-linear-gradient(115deg, transparent 0 7px, #302b23 8px 11px, transparent 12px 18px), linear-gradient(#d69848, #d69848)",
    wild: true,
  },
  {
    name: "Melanistic leopard",
    description: "Wild-inspired · shadow rosettes",
    price: 1350,
    swatch:
      "radial-gradient(ellipse at 30% 30%, transparent 0 8%, #20221e 9% 15%, transparent 17%), radial-gradient(ellipse at 75% 70%, transparent 0 9%, #20221e 10% 17%, transparent 19%), linear-gradient(#37362f, #37362f)",
    wild: true,
  },
];
export const legacyCoats = [
  { to: 0, refund: 0 },
  { to: 1, refund: 0 },
  { to: 2, refund: 0 },
  { to: 3, refund: 0 },
  { to: 6, refund: 15 },
  { to: 1, refund: 20 },
  { to: 3, refund: 25 },
  { to: 2, refund: 35 },
  { to: 5, refund: 45 },
  { to: 4, refund: 0 },
  { to: 0, refund: 125 },
  { to: 2, refund: 200 },
  { to: 0, refund: 55 },
  { to: 1, refund: 65 },
  { to: 0, refund: 85 },
  { to: 1, refund: 95 },
  { to: 5, refund: 0 },
  { to: 0, refund: 140 },
  { to: 6, refund: 0 },
  { to: 6, refund: 180 },
  { to: 6, refund: 210 },
  { to: 7, refund: 0 },
  { to: 7, refund: 270 },
  { to: 8, refund: 0 },
  { to: 8, refund: 330 },
  { to: 9, refund: 0 },
  { to: 9, refund: 390 },
  { to: 9, refund: 420 },
  { to: 9, refund: 450 },
  { to: 10, refund: 0 },
  { to: 9, refund: 520 },
  { to: 11, refund: 0 },
  { to: 11, refund: 600 },
  { to: 0, refund: 650 },
  { to: 12, refund: 0 },
  { to: 13, refund: 0 },
  { to: 14, refund: 0 },
  { to: 15, refund: 0 },
  { to: 16, refund: 0 },
  { to: 17, refund: 0 },
  { to: 18, refund: 0 },
  { to: 19, refund: 0 },
  { to: 20, refund: 0 },
  { to: 21, refund: 0 },
  { to: 22, refund: 0 },
  { to: 23, refund: 0 },
];
