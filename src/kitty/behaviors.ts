export const behaviorDurations = {
  ears: 1800,
  tail: 2400,
  meow: 1800,
  stretch: 3500,
  rest: 180000,
  bed: 240000,
  drink: 5000,
  pet: 2400,
} as const;
export type CatBehavior = "idle" | keyof typeof behaviorDurations;
export function behaviorCooldown(random = Math.random()) {
  return 25000 + Math.floor(Math.max(0, Math.min(1, random)) * 15000);
}
export function chooseBehavior(
  previous: CatBehavior,
  water: number,
  focused: boolean,
  random = Math.random(),
): Exclude<CatBehavior, "idle" | "pet"> {
  const options: Exclude<CatBehavior, "idle" | "pet">[] = focused
    ? ["ears", "tail", "rest"]
    : ["ears", "tail", "meow", "stretch", "rest", "bed", ...(water > 0 ? ["drink" as const] : [])];
  const choices = options.filter((entry) => entry !== previous);
  return choices[Math.min(choices.length - 1, Math.floor(Math.max(0, random) * choices.length))]!;
}
