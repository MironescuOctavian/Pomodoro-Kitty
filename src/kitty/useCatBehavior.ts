import { createEffect, createSignal, onSettled, untrack } from "solid-js";
import { behaviorCooldown, behaviorDurations, chooseBehavior, type CatBehavior } from "./behaviors";
export function useCatBehavior(
  conditions: () => { hidden: boolean; water: number; focused: boolean },
) {
  const [behavior, setBehavior] = createSignal<CatBehavior>("idle");
  let timer: ReturnType<typeof setTimeout> | undefined;
  let end: ReturnType<typeof setTimeout> | undefined;
  let reduced = true;
  let previous: CatBehavior = "idle";
  let petAt = 0;
  const reset = () => {
    clearTimeout(timer);
    clearTimeout(end);
    setBehavior("idle");
  };
  const schedule = () => {
    clearTimeout(timer);
    if (reduced || document.hidden) return;
    timer = setTimeout(() => {
      const state = untrack(conditions);
      if (state.hidden) {
        schedule();
        return;
      }
      const selected = chooseBehavior(previous, state.water, state.focused);
      previous = selected;
      setBehavior(selected);
      end = setTimeout(() => {
        setBehavior("idle");
        schedule();
      }, behaviorDurations[selected]);
    }, behaviorCooldown());
  };
  const pet = () => {
    if (untrack(conditions).hidden || Date.now() - petAt < 3000) return;
    petAt = Date.now();
    reset();
    setBehavior("pet");
    end = setTimeout(() => {
      setBehavior("idle");
      schedule();
    }, behaviorDurations.pet);
  };
  createEffect(
    () => conditions().hidden,
    (hidden) => {
      if (hidden) reset();
      else schedule();
    },
  );
  onSettled(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      reduced = media.matches;
      reset();
      schedule();
    };
    sync();
    media.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      clearTimeout(timer);
      clearTimeout(end);
      media.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  });
  return { behavior, pet };
}
