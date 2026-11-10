import { createSignal, onSettled } from "solid-js";
import { initial, newDay, readSave, settle, welcomeJournal, type Game } from "./game";
import { syncRoomTimer, type RoomTimer } from "./room";

const key = "pomodoro-kitty-v1";
export function useKitty() {
  const [game, setGame] = createSignal(initial());
  const [ready, setReady] = createSignal(false);
  const [remaining, setRemaining] = createSignal(1500000);
  const [storageError, setStorageError] = createSignal(false);
  const [busy, setBusy] = createSignal(false);
  const [earned, setEarned] = createSignal(0);
  let current = initial();
  let storage: Storage | undefined;
  const publish = (save: boolean) => {
    setGame(structuredClone(current));
    setRemaining(current.timer.remaining);
    if (save && storage) {
      try {
        storage.setItem(key, JSON.stringify(current));
        setStorageError(false);
      } catch {
        setStorageError(true);
      }
    }
  };
  const tick = () => {
    const before = current.timer.deadline;
    const day = current.day;
    newDay(current, Date.now());
    const reward = settle(current, Date.now());
    setRemaining(current.timer.remaining);
    if (reward || (before && !current.timer.deadline) || current.day !== day) {
      setEarned(reward);
      publish(true);
    }
  };
  const act = (action: (g: Game) => void) => {
    if (!ready() || busy()) return;
    tick();
    action(current);
    publish(true);
  };
  onSettled(() => {
    try {
      storage = localStorage;
      const raw = storage.getItem(key);
      if (raw) {
        const parsed = readSave(JSON.parse(raw));
        if (parsed.success) {
          current = parsed.data;
        } else setStorageError(true);
      }
    } catch {
      setStorageError(true);
    }
    newDay(current, Date.now());
    setEarned(settle(current, Date.now()));
    publish(false);
    setReady(true);
    // Web Locks makes a second tab read-only, preventing duplicate purchases or rewards.
    let release: (() => void) | undefined;
    let disposed = false;
    const activate = () => {
      welcomeJournal(current);
      publish(true);
    };
    if (navigator.locks) {
      setBusy(true);
      void navigator.locks.request(key, { ifAvailable: true }, async (lock) => {
        if (!lock || disposed) return;
        setBusy(false);
        activate();
        await new Promise<void>((resolve) => {
          release = resolve;
        });
      });
    } else activate();
    let interval: ReturnType<typeof setInterval> | undefined;
    const visibility = () => {
      clearInterval(interval);
      if (!busy()) tick();
      if (!document.hidden)
        interval = setInterval(() => {
          if (!busy()) tick();
        }, 1000);
    };
    visibility();
    document.addEventListener("visibilitychange", visibility);
    return () => {
      disposed = true;
      release?.();
      clearInterval(interval);
      document.removeEventListener("visibilitychange", visibility);
    };
  });
  const syncRoom = (timer: RoomTimer, serverNow: number) => {
    if (!ready() || busy()) return;
    tick();
    syncRoomTimer(current, timer, serverNow, Date.now());
    tick();
    publish(true);
  };
  return { game, ready, remaining, storageError, busy, earned, act, syncRoom };
}
