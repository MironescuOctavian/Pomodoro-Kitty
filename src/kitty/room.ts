import { z } from "zod";
import { coatCatalog } from "./coats.ts";
import { durations, resetTimer, type Game, type Mode } from "./game.ts";

export const roomId = z.uuid();
export const profileSchema = z.object({
  name: z.string().trim().min(1).max(20),
  coat: z
    .number()
    .int()
    .min(0)
    .max(coatCatalog.length - 1),
  head: z.number().int().min(0).max(11),
  neck: z.number().int().min(0).max(11),
});
export type RoomCat = z.infer<typeof profileSchema>;
export const commandSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("profile"), cat: profileSchema }),
  z.object({
    type: z.literal("timer"),
    action: z.enum(["toggle", "reset", "mode"]),
    mode: z.enum(["focus", "short", "long"]).optional(),
  }),
  z.object({ type: z.literal("leave") }),
]);
export const timerSchema = z.object({
  session: z.uuid(),
  mode: z.enum(["focus", "short", "long"]),
  remaining: z.number().int().min(0).max(1500000),
  deadline: z.number().finite().min(0),
  started: z.boolean(),
});
export type RoomTimer = z.infer<typeof timerSchema>;
export const snapshotSchema = z.object({
  type: z.literal("room"),
  host: z.boolean(),
  now: z.number().finite(),
  timer: timerSchema,
  friend: profileSchema.extend({ online: z.boolean() }).nullable(),
});
export type RoomSnapshot = z.infer<typeof snapshotSchema>;

export function freshRoomTimer(mode: Mode = "focus"): RoomTimer {
  return {
    session: crypto.randomUUID(),
    mode,
    remaining: durations[mode] * 1000,
    deadline: 0,
    started: false,
  };
}

export function changeRoomTimer(
  timer: RoomTimer,
  action: "toggle" | "reset" | "mode",
  now: number,
  mode?: Mode,
): RoomTimer {
  if (action === "mode" || action === "reset") return freshRoomTimer(mode ?? timer.mode);
  const remaining = timer.deadline ? Math.max(0, timer.deadline - now) : timer.remaining;
  if (timer.deadline && remaining > 0) return { ...timer, remaining, deadline: 0 };
  if (!remaining) timer = freshRoomTimer(mode ?? (timer.mode === "focus" ? "short" : "focus"));
  return { ...timer, started: true, deadline: now + timer.remaining };
}

export function syncRoomTimer(game: Game, timer: RoomTimer, serverNow: number, now: number) {
  if (game.timer.roomSession !== timer.session) {
    resetTimer(game, timer.mode);
    game.timer.roomSession = timer.session;
    // Joining midway is welcome; rewards require participating from the start.
    game.timer.eligible = !timer.started;
    game.timer.reward =
      timer.mode !== "focus" && game[timer.mode] < (timer.mode === "short" ? 5 : 3);
  } else if (!game.timer.remaining && !game.timer.deadline) return;
  game.timer.mode = timer.mode;
  game.timer.remaining = timer.deadline ? Math.max(0, timer.deadline - serverNow) : timer.remaining;
  game.timer.deadline = timer.deadline ? timer.deadline + now - serverNow : 0;
  game.timer.started = timer.started;
}
