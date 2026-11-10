import assert from "node:assert/strict";
import test from "node:test";
import { initial, settle } from "./game.ts";
import {
  changeRoomTimer,
  commandSchema,
  freshRoomTimer,
  profileSchema,
  syncRoomTimer,
} from "./room.ts";

test("shared timer starts, pauses, resumes and changes modes using server time", () => {
  let timer = freshRoomTimer();
  timer = changeRoomTimer(timer, "toggle", 1000);
  assert.equal(timer.deadline, 1501000);
  const session = timer.session;
  timer = changeRoomTimer(timer, "toggle", 11000);
  assert.equal(timer.remaining, 1490000);
  assert.equal(timer.deadline, 0);
  timer = changeRoomTimer(timer, "toggle", 21000);
  assert.equal(timer.deadline, 1511000);
  assert.equal(timer.session, session);
  timer = changeRoomTimer(timer, "toggle", 1511000);
  assert.equal(timer.mode, "short");
  assert.notEqual(timer.session, session);
  timer = changeRoomTimer(timer, "mode", 1511000, "long");
  assert.equal(timer.remaining, 900000);
  assert.equal(timer.deadline, 0);
});

test("room sync compensates for clock differences and grants each completion once", () => {
  const game = initial(1000);
  let timer = freshRoomTimer();
  syncRoomTimer(game, timer, 1000, 9000);
  timer = changeRoomTimer(timer, "toggle", 1000);
  syncRoomTimer(game, timer, 2000, 10000);
  assert.equal(game.timer.deadline, 1509000);
  assert.equal(settle(game, 1509000), 6);
  assert.equal(game.sessions, 1);
  syncRoomTimer(game, timer, 1501000, 1509000);
  assert.equal(settle(game, 1509000), 0);
  assert.equal(game.sessions, 1);
});

test("late joiners see the timer without receiving a full-session reward", () => {
  const game = initial(1000);
  const timer = changeRoomTimer(freshRoomTimer(), "toggle", 1000);
  syncRoomTimer(game, timer, 100000, 100000);
  assert.equal(game.timer.remaining, 1401000);
  assert.equal(settle(game, timer.deadline), 0);
  assert.equal(game.sessions, 0);
  assert.equal(game.coins, 5);
});

test("room messages validate public cat data and reject arbitrary timer state", () => {
  assert.equal(profileSchema.safeParse({ name: "Miso", coat: 0, head: 0, neck: 0 }).success, true);
  assert.equal(
    profileSchema.safeParse({ name: "Miso", coat: 9999, head: 0, neck: 0 }).success,
    false,
  );
  assert.equal(
    commandSchema.safeParse({ type: "timer", action: "set", deadline: 1 }).success,
    false,
  );
  assert.equal(
    commandSchema.safeParse({ type: "profile", cat: { name: "", coat: 0, head: 0, neck: 0 } })
      .success,
    false,
  );
});
