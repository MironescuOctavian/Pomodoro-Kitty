import { z } from "zod";
import { coatCatalog, legacyCoats } from "./coats.ts";

export const durations = { focus: 1500, short: 300, long: 900 };
export type Mode = keyof typeof durations;
export const coats = coatCatalog.map((coat) => coat.swatch);
export const prices = coatCatalog.map((coat) => coat.price);
export const milestones = [1, 3, 5, 8, 12, 18, 25, 35, 50, 75, 100];
export const FOCUS_COINS = 6;
export const LUNCH_PRICE = 4;
export const foods = [
  { price: 1, heal: 1, bonus: 0 },
  { price: 2, heal: 2, bonus: 0 },
  { price: 3, heal: 3, bonus: 0 },
  { price: 4, heal: 4, bonus: 0 },
  { price: 5, heal: 5, bonus: 0 },
  { price: 6, heal: 6, bonus: 0 },
  { price: 9, heal: 6, bonus: 2 },
  { price: 12, heal: 6, bonus: 4 },
  { price: 15, heal: 6, bonus: 6 },
];
export const dayKey = (now: number) => new Date(now).toLocaleDateString("en-CA");
const integer = (max: number) => z.number().int().min(0).max(max);
export const schema = z.object({
  coatCatalogVersion: z.literal(2).default(2),
  sharedMedals: z.boolean().default(false),
  version: z.literal(1),
  adopted: z.boolean(),
  name: z.string().trim().min(1).max(20),
  coins: integer(1e9),
  health: integer(10).transform((value) => Math.min(6, value)),
  tasks: z
    .array(
      z.object({
        id: z.string().max(80),
        text: z.string().trim().min(1).max(120),
        done: z.boolean(),
        settled: z.boolean(),
      }),
    )
    .max(30)
    .default([]),
  taskCredits: integer(3).default(0),
  taskClaims: integer(3).default(0),
  taskAdds: integer(10).default(0),
  todaySessions: integer(1e9).default(0),
  todayTasks: integer(1e9).default(0),
  totalTasks: integer(1e9).default(0),
  totalBreaks: integer(1e9).default(0),
  currentTask: z.string().max(80).default(""),
  dailyGoal: z.union([z.literal(2), z.literal(4), z.literal(6)]).default(4),
  sessionHistory: z
    .array(z.object({ mode: z.enum(["focus", "short", "long"]), completedAt: z.number().min(0) }))
    .max(100)
    .default([]),
  journal: z
    .array(
      z.object({
        id: z.string().max(80),
        kind: z.enum(["care", "collection", "milestone", "hello", "encouragement"]),
        text: z.string().max(200),
        at: z.number().min(0),
      }),
    )
    .max(40)
    .default([]),
  bonus: integer(12),
  feeds: integer(1e9),
  sessions: integer(1e9),
  hunger: integer(1),
  careCredits: integer(1e9),
  protection: integer(1e6),
  renames: integer(3),
  coat: integer(coatCatalog.length - 1),
  owned: z.array(integer(coatCatalog.length - 1)).max(coatCatalog.length),
  head: integer(11),
  neck: integer(11),
  day: z.string(),
  gift: z.boolean(),
  bowl: integer(8),
  short: integer(5),
  long: integer(3),
  timer: z.object({
    mode: z.enum(["focus", "short", "long"]),
    remaining: integer(1500000),
    deadline: z.number().min(0),
    started: z.boolean(),
    reward: z.boolean(),
    giftAt: integer(1500000),
    giftCoins: integer(3),
  }),
});
export type Game = z.infer<typeof schema>;
// Read older two-companion saves without retaining the switching system.
export function readSave(input: unknown) {
  if (!input || typeof input !== "object") return schema.safeParse(input);
  const raw = input as Record<string, unknown>;
  const value = { ...raw };
  const resting =
    raw["resting"] && typeof raw["resting"] === "object"
      ? (raw["resting"] as Record<string, unknown>)
      : null;
  if (raw["species"] === "dog" && resting) {
    for (const key of [
      "name",
      "health",
      "bonus",
      "hunger",
      "careCredits",
      "protection",
      "renames",
      "coat",
      "owned",
      "head",
      "neck",
    ]) {
      if (key in resting) value[key] = resting[key];
    }
    // An in-progress session belonged to the removed companion.
    value["timer"] = initial().timer;
  }
  if (!raw["sharedMedals"]) {
    value["feeds"] = Math.min(
      1e9,
      (Number(raw["feeds"]) || 0) + Math.max(0, Number(resting?.["feeds"]) || 0),
    );
  }
  if (raw["coatCatalogVersion"] !== 2) {
    const owned = Array.isArray(value["owned"]) ? (value["owned"] as unknown[]) : [];
    const valid = [
      ...new Set(
        owned.filter(
          (id): id is number =>
            typeof id === "number" && Number.isInteger(id) && id >= 0 && id < legacyCoats.length,
        ),
      ),
    ];
    const selected = typeof value["coat"] === "number" ? legacyCoats[value["coat"]] : undefined;
    value["owned"] = [
      ...new Set([
        0,
        1,
        2,
        ...valid.map((id) => legacyCoats[id]!.to),
        ...(selected ? [selected.to] : []),
      ]),
    ];
    value["coat"] = selected?.to ?? 0;
    if (typeof value["coins"] === "number")
      value["coins"] = Math.min(
        1e9,
        value["coins"] + valid.reduce((sum, id) => sum + legacyCoats[id]!.refund, 0),
      );
    value["coatCatalogVersion"] = 2;
  }
  value["sharedMedals"] = true;
  if (!("totalTasks" in value))
    value["totalTasks"] = Math.max(
      Number(value["todayTasks"]) || 0,
      Array.isArray(value["tasks"]) ? value["tasks"].filter((task) => task?.settled).length : 0,
    );
  if (!("totalBreaks" in value))
    value["totalBreaks"] = Array.isArray(value["sessionHistory"])
      ? value["sessionHistory"].filter((entry) => entry?.mode === "short" || entry?.mode === "long")
          .length
      : 0;
  return schema.safeParse(value);
}
export function initial(now = Date.now()): Game {
  return {
    version: 1,
    coatCatalogVersion: 2,
    sharedMedals: true,
    adopted: false,
    name: "Mochi",
    coins: 5,
    health: 6,
    tasks: [],
    taskCredits: 0,
    taskClaims: 0,
    taskAdds: 0,
    todaySessions: 0,
    todayTasks: 0,
    totalTasks: 0,
    totalBreaks: 0,
    currentTask: "",
    dailyGoal: 4,
    sessionHistory: [],
    journal: [],
    bonus: 0,
    feeds: 0,
    sessions: 0,
    hunger: 0,
    careCredits: 1,
    protection: 0,
    renames: 0,
    coat: 0,
    owned: [0, 1, 2],
    head: 0,
    neck: 0,
    day: dayKey(now),
    gift: false,
    bowl: 0,
    short: 0,
    long: 0,
    timer: timerState(),
  };
}
function timerState(mode: Mode = "focus") {
  return {
    mode,
    remaining: durations[mode] * 1000,
    deadline: 0,
    started: false,
    reward: false,
    giftAt: 0,
    giftCoins: 0,
  };
}
export function resetTimer(g: Game, mode: Mode = g.timer.mode) {
  g.timer = timerState(mode);
}
export function nextSessionMode(g: Game): Mode {
  return g.timer.mode !== "focus"
    ? "focus"
    : g.sessions > 0 && g.sessions % 4 === 0
      ? "long"
      : "short";
}
export function recordJournal(
  g: Game,
  kind: Game["journal"][number]["kind"],
  text: string,
  at = Date.now(),
) {
  g.journal = [
    ...g.journal.slice(-39),
    { id: crypto.randomUUID(), kind, text: text.slice(0, 200), at },
  ];
}
const encouragements = [
  "One thing at a time. I'm right here with you.",
  "You showed up. That counts for more than you think.",
  "Small steps still move you forward. Tiny paws, remember?",
  "You don't have to finish everything today.",
  "Take a breath. Your next small step is enough.",
  "I'm proud of you for making a little space for yourself.",
  "A tricky day doesn't erase the good work you've done.",
  "Rest is part of the plan. I'm very qualified in naps.",
  "You bring the effort. I'll bring the moral support.",
  "Messy progress is still progress. Have you seen my paw prints?",
  "Let's make the next thing a little smaller and easier.",
  "Your pace is allowed to be your own.",
  "I'm rooting for you. Quietly. From this extremely comfy spot.",
  "You deserve a kind word, even on the slow days.",
  "A little focus, a little rest. We're doing this together.",
  "You don't need a perfect day to do one worthwhile thing.",
  "Some days are for big leaps. Some are for tiny paw steps.",
  "Still here. Still cheering you on. Possibly still napping.",
  "Drink some water when you can. I'll keep your place warm.",
  "Whatever comes next, you don't have to rush into it.",
];
export function encourage(g: Game, now = Date.now(), random = Math.random) {
  if (!g.adopted) return;
  const recent = g.journal.filter((entry) => entry.kind === "encouragement").slice(-3);
  const available = encouragements.filter(
    (message) => !recent.some((entry) => entry.text.endsWith(`“${message}”`)),
  );
  const message =
    available[
      Math.min(available.length - 1, Math.max(0, Math.floor(random() * available.length)))
    ]!;
  recordJournal(g, "encouragement", `${g.name} says: “${message}”`, now);
}
export function welcomeJournal(g: Game, now = Date.now(), random = Math.random) {
  if (
    !g.journal.some((entry) => entry.kind === "encouragement" && dayKey(entry.at) === dayKey(now))
  )
    encourage(g, now, random);
}
export function newDay(g: Game, now: number) {
  const day = dayKey(now);
  if (g.day !== day) {
    g.day = day;
    g.gift = false;
    g.bowl = 0;
    g.short = 0;
    g.taskCredits = 0;
    g.taskClaims = 0;
    g.taskAdds = 0;
    g.todaySessions = 0;
    g.todayTasks = 0;
    g.sessionHistory = [];
    g.long = 0;
  }
}
// All rewards and care changes happen here, once per completed session.
export function settle(g: Game, now: number, random = Math.random) {
  const timer = g.timer;
  if (!timer.deadline) return 0;
  timer.remaining = Math.max(0, timer.deadline - now);
  let coins = 0;
  if (timer.giftCoins && timer.remaining <= timer.giftAt) {
    coins += timer.giftCoins;
    timer.giftCoins = 0;
  }
  if (timer.remaining === 0) {
    encourage(g, now, random);
    if (timer.mode !== "focus") g.totalBreaks++;
    g.sessionHistory = [...g.sessionHistory.slice(-99), { mode: timer.mode, completedAt: now }];
    if (timer.mode === "focus") {
      coins += FOCUS_COINS;
      g.sessions++;
      if ([1, 5, 10, 25, 50].includes(g.sessions) || g.sessions % 100 === 0) {
        recordJournal(
          g,
          "milestone",
          `${g.name} kept you company for ${g.sessions} focus ${g.sessions === 1 ? "session" : "sessions"}. Little steps, big things.`,
          now,
        );
      }
      g.todaySessions++;
      g.taskCredits = Math.min(3 - g.taskClaims, g.taskCredits + 1);
      g.careCredits++;
      if (g.adopted && g.health + g.bonus > 0) {
        if (g.protection > 0) g.protection--;
        else {
          g.hunger++;
          if (g.hunger >= 2) {
            if (g.bonus) g.bonus--;
            else g.health--;
            g.hunger = 0;
          }
        }
      }
    } else if (timer.reward) {
      const mode = timer.mode;
      g[mode] = Math.min(mode === "short" ? 5 : 3, g[mode] + 1);
      const marks = Math.min(8 - g.bowl, timer.mode === "short" ? 1 : 2);
      coins += marks;
      if (marks && g.bowl + marks === 8) coins += 4;
      g.bowl += marks;
    }
    timer.deadline = 0;
    timer.started = false;
  }
  g.coins += coins;
  return coins;
}
export function toggle(g: Game, now: number, random = Math.random) {
  if (g.timer.deadline) {
    settle(g, now, random);
    g.timer.deadline = 0;
    return;
  }
  if (!g.timer.remaining) resetTimer(g);
  const timer = g.timer;
  if (!timer.started) {
    timer.started = true;
    if (timer.mode === "focus") {
      timer.giftCoins = random() < 0.25 ? (random() < 0.1 ? 3 : 1) : 0;
      timer.giftAt = Math.round(durations.focus * 1000 * (0.25 + random() * 0.5));
    } else {
      const limit = timer.mode === "short" ? 5 : 3;
      timer.reward = g[timer.mode] < limit;
    }
  }
  timer.deadline = now + timer.remaining;
}
export function feed(g: Game, index: number) {
  const food = foods[index];
  if (
    !food ||
    !g.adopted ||
    g.health + g.bonus === 0 ||
    g.coins < food.price ||
    (g.health === MAX_HEALTH && (!food.bonus || g.bonus === 12))
  )
    return false;
  g.coins -= food.price;
  g.health = Math.min(MAX_HEALTH, g.health + (food.heal === 6 ? MAX_HEALTH : food.heal));
  g.bonus = Math.min(12, g.bonus + food.bonus);
  g.hunger = 0;
  recordJournal(
    g,
    "care",
    `${g.name} enjoyed ${food.bonus ? "a special feast" : "a little snack"}. A cozy moment together.`,
  );
  if (g.careCredits > 0) {
    g.feeds++;
    g.careCredits--;
    if (milestones.includes(g.feeds))
      recordJournal(
        g,
        "milestone",
        `${g.feeds} care feeds together! ${g.name} has a new accessory waiting in the closet.`,
      );
  }
  return true;
}
export function rename(g: Game, name: string) {
  const cost = [0, 5, 10][g.renames];
  name = name.trim();
  if (!name || name.length > 20 || name === g.name || cost === undefined || g.coins < cost)
    return false;
  recordJournal(
    g,
    "hello",
    `${g.name} is now called ${name}. A new name for the same little friend.`,
  );
  g.name = name;
  g.coins -= cost;
  g.renames++;
  return true;
}

export const MAX_HEALTH = 6;

export function addTask(g: Game, text: string) {
  text = text.trim();
  if (
    !text ||
    text.length > 120 ||
    g.taskAdds >= 10 ||
    g.tasks.length >= 30 ||
    g.tasks.some((task) => task.text.toLocaleLowerCase() === text.toLocaleLowerCase())
  )
    return false;
  g.tasks.push({ id: crypto.randomUUID(), text, done: false, settled: false });
  g.taskAdds++;
  return true;
}
export function toggleTask(g: Game, id: string) {
  const task = g.tasks.find((item) => item.id === id);
  if (!task) return 0;
  task.done = !task.done;
  if (task.done && g.currentTask === id) g.currentTask = "";
  if (!task.done || task.settled) return 0;
  task.settled = true;
  g.todayTasks++;
  g.totalTasks++;
  if (!g.taskCredits || g.taskClaims >= 3) return 0;
  g.taskCredits--;
  g.taskClaims++;
  g.coins++;
  return 1;
}
export function equip(g: Game, kind: "coat", index: number) {
  if (!Number.isInteger(index) || index < 0 || index >= coats.length) return false;
  if (!g.owned.includes(index)) {
    const price = prices[index] ?? Infinity;
    if (g.coins < price) return false;
    g.coins -= price;
    g.owned.push(index);
    recordJournal(
      g,
      "collection",
      `${g.name} added ${coatCatalog[index]!.name} to the closet. A lovely new look.`,
    );
  }
  g[kind] = index;
  return true;
}
export function claimDaily(g: Game, now = Date.now(), random = Math.random) {
  newDay(g, now);
  if (g.gift) return 0;
  const coins = 1 + Math.floor(random() * 3);
  g.coins += coins;
  g.gift = true;
  return coins;
}
