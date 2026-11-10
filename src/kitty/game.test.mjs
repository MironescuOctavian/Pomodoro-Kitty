import assert from "node:assert/strict";
import { coatCatalog } from "./coats.ts";
import { test } from "node:test";
import {
  addTask,
  claimDaily,
  equip,
  feed,
  initial,
  newDay,
  nextSessionMode,
  recordJournal,
  encourage,
  welcomeJournal,
  readSave,
  rename,
  resetTimer,
  schema,
  settle,
  toggle,
  toggleTask,
} from "./game.ts";

test("older two-pet saves restore cat fields and preserve shared progress", () => {
  const saved = {
    ...initial(),
    species: "dog",
    name: "Puppy",
    coins: 321,
    feeds: 50,
    resting: { ...initial(), name: "Original cat", health: 3, coat: 4, owned: [0, 1, 2, 4] },
  };
  const result = readSave(saved);
  assert.ok(result.success);
  assert.equal(result.data.name, "Original cat");
  assert.equal(result.data.health, 3);
  assert.equal(result.data.coins, 321);
  assert.equal(result.data.feeds, 50);
  assert.equal("species" in result.data, false);
  assert.equal("resting" in result.data, false);
  assert.deepEqual(readSave(result.data).data, result.data);
});
test("starting balance is five coins", () => {
  assert.equal(initial().coins, 5);
  assert.equal(initial().health, 2);
  assert.equal(initial().bonus, 0);
});
test("task coins require focus, cannot repeat, and cap at three daily", () => {
  const g = initial();
  addTask(g, "Read a chapter");
  assert.equal(addTask(g, "read a chapter"), false);
  assert.equal(toggleTask(g, g.tasks[0].id), 0);
  session(g);
  toggleTask(g, g.tasks[0].id);
  assert.equal(toggleTask(g, g.tasks[0].id), 0);
  for (let i = 0; i < 5; i++) {
    session(g);
    addTask(g, `Task ${i}`);
    const id = g.tasks.at(-1).id;
    assert.equal(toggleTask(g, id), i < 3 ? 1 : 0);
    toggleTask(g, id);
    assert.equal(toggleTask(g, id), 0);
  }
  assert.equal(g.taskClaims, 3);
  newDay(g, Date.now() + 86400000);
  assert.equal(g.taskClaims, 0);
  assert.equal(g.taskCredits, 0);
});
const session = (g) => {
  resetTimer(g, "focus");
  toggle(g, 1000, () => 0.9);
  settle(g, 1501000, () => 0);
};

test("daily focus summary persists, counts each task once, and resets independently", () => {
  const g = initial();
  session(g);
  session(g);
  addTask(g, "Daily summary task");
  const id = g.tasks.at(-1).id;
  toggleTask(g, id);
  toggleTask(g, id);
  toggleTask(g, id);
  assert.equal(g.todaySessions, 2);
  assert.equal(g.todayTasks, 1);
  assert.equal(readSave(g).data.todaySessions, 2);
  const old = { ...g };
  delete old.todaySessions;
  delete old.todayTasks;
  assert.equal(readSave(old).data.todaySessions, 0);
  newDay(g, Date.now() + 86400000);
  assert.equal(g.todaySessions, 0);
  assert.equal(g.todayTasks, 0);
  assert.equal(g.sessions, 2);
});
test("focus settles once, keeps elapsed time through pauses, and never farms offline sessions", () => {
  const g = initial();
  g.adopted = true;
  toggle(g, 1000, () => 0.9);
  toggle(g, 101000);
  assert.equal(g.timer.remaining, 1400000);
  toggle(g, 200000);
  settle(g, 999999999, () => 0);
  assert.equal(g.sessions, 1);
  assert.equal(g.coins, 11);
  settle(g, 999999999);
  assert.equal(g.coins, 11);
});
test("hunger consumes bonus hearts before regular hearts", () => {
  const g = initial();
  g.health = 6;
  g.adopted = true;
  session(g);
  assert.equal(g.health, 6);
  session(g);
  assert.equal(g.health, 5);
  g.bonus = 2;
  session(g);
  session(g);
  assert.equal(g.bonus, 1);
  assert.equal(g.health, 5);
  const health = g.health;
  session(g);
  assert.equal(g.bonus, 1);
  session(g);
  assert.equal(g.bonus, 0);
  session(g);
  session(g);
  assert.equal(g.health, health - 1);
});

test("retired catnip protection is removed from saved games", () => {
  const saved = { ...initial(), protection: 80, coins: 130, sessions: 25 };
  const parsed = readSave(saved);
  assert.ok(parsed.success);
  assert.equal("protection" in parsed.data, false);
  assert.equal(parsed.data.coins, 130);
  assert.equal(parsed.data.sessions, 25);
});

test("retired cleaning data is discarded without losing saved progress", () => {
  const saved = { ...initial(), sinceClean: 999, coins: 120, sessions: 40 };
  const parsed = readSave(saved);
  assert.ok(parsed.success);
  assert.equal("sinceClean" in parsed.data, false);
  assert.equal(parsed.data.coins, 120);
  assert.equal(parsed.data.sessions, 40);
});
test("food caps health and bonus, prevents waste, and gates medal progress", () => {
  const g = initial();
  g.health = 6;
  g.adopted = true;
  g.coins = 100;
  assert.equal(feed(g, 0), false);
  g.health = 3;
  assert.equal(feed(g, 0), true);
  assert.equal(g.feeds, 1);
  feed(g, 0);
  assert.equal(g.feeds, 1);
  feed(g, 8);
  assert.equal(g.health, 6);
  assert.equal(g.bonus, 6);
  feed(g, 8);
  assert.equal(g.bonus, 12);
  assert.equal(feed(g, 8), false);
});
test("rename prices and invalid names", () => {
  const g = initial();
  g.coins = 15;
  assert.equal(rename(g, " "), false);
  assert.equal(rename(g, "Pip"), true);
  assert.equal(g.coins, 15);
  rename(g, "Miso");
  assert.equal(g.coins, 10);
  rename(g, "Maple");
  assert.equal(g.coins, 0);
  assert.equal(rename(g, "Other"), false);
});
test("water pays only remaining marks, completion bonus once, limits don't block breaks", () => {
  const g = initial();
  g.bowl = 7;
  resetTimer(g, "long");
  toggle(g, 1000);
  settle(g, 901000);
  assert.equal(g.bowl, 8);
  assert.equal(g.coins, 10);
  resetTimer(g, "long");
  toggle(g, 1000);
  settle(g, 901000);
  assert.equal(g.coins, 10);
  g.long = 3;
  resetTimer(g, "long");
  toggle(g, 1000);
  assert.equal(g.timer.reward, false);
  assert.ok(g.timer.deadline);
});
test("daily reset and validated saves", () => {
  const g = initial(0);
  g.gift = true;
  g.short = 5;
  g.bowl = 8;
  newDay(g, 172800000);
  assert.equal(g.gift, false);
  assert.equal(g.short, 0);
  assert.equal(g.bowl, 0);
  assert.ok(schema.safeParse(g).success);
  assert.equal(schema.safeParse({ ...g, health: -1 }).success, false);
});
test("surprise gift is paid once and survives pause", () => {
  const g = initial();
  toggle(g, 1000, () => 0);
  settle(g, 1200000, () => 0);
  const coins = g.coins;
  assert.equal(coins, 8);
  assert.equal(g.timer.giftCoins, 0);
  toggle(g, 1200001);
  toggle(g, 1300000);
  settle(g, 1300001);
  assert.equal(g.coins, coins);
});

test("daily task creation caps at ten, survives reload and deletion, and resets tomorrow", () => {
  const g = initial();
  assert.equal(addTask(g, ""), false);
  for (let i = 0; i < 10; i++) assert.equal(addTask(g, `Task ${i}`), true);
  assert.equal(addTask(g, "Extra task"), false);
  const saved = schema.parse(JSON.parse(JSON.stringify(g)));
  saved.tasks = [];
  assert.equal(addTask(saved, "Still limited"), false);
  newDay(saved, Date.now() + 86400000);
  assert.equal(addTask(saved, "Tomorrow's task"), true);
  assert.equal(saved.taskAdds, 1);
});

test("old room fields are discarded and coats still equip", () => {
  const g = initial();
  g.coins = 100;
  assert.ok(equip(g, "coat", 3));
  const old = { ...g, wall: 2, walls: [0, 2], decor: 1, decorations: [0, 1], furniture: [0, 1] };
  const parsed = schema.parse(old);
  assert.equal("furniture" in parsed, false);
  assert.equal("wall" in parsed, false);
  assert.equal(parsed.coat, 3);
  assert.equal(
    claimDaily(parsed, Date.now(), () => 0),
    1,
  );
});

test("current task clears on completion and daily goal persists through resets", () => {
  const g = initial();
  addTask(g, "Selected task");
  g.currentTask = g.tasks[0].id;
  g.dailyGoal = 6;
  const saved = readSave(JSON.parse(JSON.stringify(g)));
  assert.ok(saved.success);
  assert.equal(saved.data.currentTask, g.currentTask);
  assert.equal(saved.data.dailyGoal, 6);
  toggleTask(g, g.currentTask);
  assert.equal(g.currentTask, "");
  newDay(g, Date.now() + 86400000);
  assert.equal(g.dailyGoal, 6);
  assert.equal(schema.safeParse({ ...g, dailyGoal: 5 }).success, false);
});

test("history records only completed sessions, caps its size, and resets daily", () => {
  const g = initial();
  toggle(g, 1000, () => 0.9);
  toggle(g, 2000);
  assert.equal(g.sessionHistory.length, 0);
  session(g);
  assert.deepEqual(g.sessionHistory[0], { mode: "focus", completedAt: 1501000 });
  settle(g, 1501001);
  assert.equal(g.sessionHistory.length, 1);
  resetTimer(g, "short");
  toggle(g, 2000000);
  settle(g, 2300000);
  assert.equal(g.sessionHistory[1].mode, "short");
  resetTimer(g, "long");
  toggle(g, 3000000);
  settle(g, 3900000);
  assert.equal(g.sessionHistory[2].mode, "long");
  for (let i = 0; i < 101; i++) session(g);
  assert.equal(g.sessionHistory.length, 100);
  assert.equal(readSave(g).data.sessionHistory.length, 100);
  newDay(g, Date.now() + 86400000);
  assert.deepEqual(g.sessionHistory, []);
});

test("older saves receive safe task, goal, and history defaults", () => {
  const old = { ...initial() };
  delete old.currentTask;
  delete old.dailyGoal;
  delete old.sessionHistory;
  const parsed = readSave(old);
  assert.ok(parsed.success);
  assert.equal(parsed.data.currentTask, "");
  assert.equal(parsed.data.dailyGoal, 4);
  assert.deepEqual(parsed.data.sessionHistory, []);
});

test("expanded coat collection preserves old slots and validates end-game purchases", () => {
  const g = initial();
  g.coat = 11;
  g.owned = [0, 1, 2, 11];
  assert.ok(readSave(g).success);
  assert.equal(readSave(g).data.coat, 11);
  const last = coatCatalog.length - 1;
  g.coins = coatCatalog[last].price - 1;
  assert.equal(equip(g, "coat", last), false);
  g.coins++;
  assert.equal(equip(g, "coat", last), true);
  assert.equal(g.coins, 0);
  assert.equal(g.coat, last);
  assert.ok(readSave(g).success);
  assert.equal(equip(g, "coat", coatCatalog.length), false);
  assert.equal(equip(g, "coat", last), true);
  assert.equal(g.coins, 0);
  assert.equal(new Set(coatCatalog.map((coat) => coat.name)).size, coatCatalog.length);
  assert.equal(coatCatalog.filter((coat) => !coat.wild).length, 12);
  assert.equal(coatCatalog.filter((coat) => coat.wild).length, 12);
  assert.ok(coatCatalog.filter((coat) => coat.wild).every((coat) => coat.price >= 220));
});

test("retired coat migration keeps ownership, refunds removed coats once, and preserves wild coats", () => {
  const old = { ...initial(), coins: 100, coat: 23, owned: [0, 1, 2, 23, 24, 45] };
  delete old.coatCatalogVersion;
  const result = readSave(old);
  assert.ok(result.success);
  assert.equal(coatCatalog[result.data.coat].name, "Calico");
  assert.ok(result.data.owned.includes(23));
  assert.equal(result.data.coins, 430);
  assert.deepEqual(readSave(result.data).data, result.data);
});

test("abandoned breaks do not consume reward slots; completed breaks count once", () => {
  const g = initial();
  for (let i = 0; i < 8; i++) {
    resetTimer(g, "short");
    toggle(g, 1000);
  }
  assert.equal(g.short, 0);
  settle(g, 301000);
  assert.equal(g.short, 1);
  settle(g, 302000);
  assert.equal(g.short, 1);
});

test("a four-session day can fund care and still save 32 coins", () => {
  const g = initial();
  g.health = 6;
  g.adopted = true;
  claimDaily(g, Date.now(), () => 0.5);
  for (let i = 0; i < 4; i++) {
    session(g);
    if (i < 3) {
      addTask(g, `Daily task ${i}`);
      toggleTask(g, g.tasks.at(-1).id);
    }
    resetTimer(g, i === 3 ? "long" : "short");
    toggle(g, 1000);
    settle(g, i === 3 ? 901000 : 301000);
  }
  assert.equal(g.health, 4);
  assert.equal(feed(g, 1), true);
  assert.equal(g.health, 6);
  assert.equal(g.coins, 37);
});

test("next-session suggestions alternate focus and breaks, with a long break every fourth focus", () => {
  const g = initial();
  assert.equal(nextSessionMode(g), "short");
  g.sessions = 4;
  assert.equal(nextSessionMode(g), "long");
  resetTimer(g, "short");
  assert.equal(nextSessionMode(g), "focus");
  resetTimer(g, "long");
  assert.equal(nextSessionMode(g), "focus");
  assert.equal(g.timer.deadline, 0);
});

test("lifetime task and break totals persist and are not inflated by repeats or daily resets", () => {
  const g = initial();
  addTask(g, "Lifetime task");
  const id = g.tasks[0].id;
  toggleTask(g, id);
  toggleTask(g, id);
  toggleTask(g, id);
  assert.equal(g.totalTasks, 1);
  resetTimer(g, "short");
  g.short = 5;
  toggle(g, 1000);
  settle(g, 301000);
  settle(g, 302000);
  assert.equal(g.totalBreaks, 1);
  newDay(g, Date.now() + 86400000);
  assert.equal(g.todayTasks, 0);
  assert.equal(g.totalTasks, 1);
  assert.equal(g.totalBreaks, 1);
  assert.equal(readSave(g).data.totalTasks, 1);
  assert.equal(readSave(g).data.totalBreaks, 1);
});

test("older saves recover lifetime totals only from available saved evidence", () => {
  const g = initial();
  addTask(g, "Old completed task");
  toggleTask(g, g.tasks[0].id);
  g.sessionHistory = [
    { mode: "short", completedAt: 1000 },
    { mode: "focus", completedAt: 2000 },
    { mode: "long", completedAt: 3000 },
  ];
  delete g.totalTasks;
  delete g.totalBreaks;
  const migrated = readSave(g);
  assert.ok(migrated.success);
  assert.equal(migrated.data.totalTasks, 1);
  assert.equal(migrated.data.totalBreaks, 2);
  assert.deepEqual(readSave(migrated.data).data, migrated.data);
});

test("journal records successful events and focus milestones only once", () => {
  const g = initial();
  g.health = 6;
  g.adopted = true;
  assert.equal(feed(g, 0), false);
  assert.equal(g.journal.length, 0);
  g.health = 4;
  feed(g, 0);
  assert.equal(g.journal.filter((entry) => entry.kind === "care").length, 1);
  assert.equal(equip(g, "coat", 3), false);
  assert.equal(g.journal.filter((entry) => entry.kind === "collection").length, 0);
  g.coins = 100;
  equip(g, "coat", 3);
  equip(g, "coat", 3);
  assert.equal(g.journal.filter((entry) => entry.kind === "collection").length, 1);
  session(g);
  const count = g.journal.length;
  settle(g, 2000000);
  assert.equal(g.journal.length, count);
  assert.ok(g.journal.some((entry) => entry.text.includes("1 focus session")));
});

test("journal retains forty recent moments across days and older saves default safely", () => {
  const g = initial();
  for (let i = 0; i < 45; i++) recordJournal(g, "care", `Moment ${i}`, i);
  assert.equal(g.journal.length, 40);
  assert.equal(g.journal[0].text, "Moment 5");
  newDay(g, Date.now() + 86400000);
  assert.equal(g.journal.length, 40);
  assert.deepEqual(readSave(g).data.journal, g.journal);
  const old = { ...initial() };
  delete old.journal;
  assert.deepEqual(readSave(old).data.journal, []);
});

test("encouragement uses the cat name, avoids recent repeats, and welcomes only once daily", () => {
  const g = initial();
  welcomeJournal(g, Date.now(), () => 0);
  assert.equal(g.journal.length, 0);
  g.adopted = true;
  g.name = "Mochi";
  const now = Date.now();
  welcomeJournal(g, now, () => 0);
  assert.equal(g.journal.length, 1);
  assert.ok(g.journal[0].text.startsWith("Mochi says:"));
  welcomeJournal(g, now + 1, () => 0);
  assert.equal(g.journal.length, 1);
  encourage(g, now + 2, () => 0);
  encourage(g, now + 3, () => 0);
  assert.equal(new Set(g.journal.map((entry) => entry.text)).size, 3);
  welcomeJournal(g, now + 86400000, () => 0);
  assert.equal(g.journal.length, 4);
  assert.ok(readSave(g).success);
});

test("completed sessions add one encouraging note, while pausing and repeat settlement do not", () => {
  const g = initial();
  g.adopted = true;
  toggle(g, 1000, () => 0.9);
  toggle(g, 2000);
  assert.equal(g.journal.length, 0);
  toggle(g, 3000);
  settle(g, 2000000);
  const count = g.journal.filter((entry) => entry.kind === "encouragement").length;
  assert.equal(count, 1);
  settle(g, 2000001);
  assert.equal(g.journal.filter((entry) => entry.kind === "encouragement").length, 1);
});
