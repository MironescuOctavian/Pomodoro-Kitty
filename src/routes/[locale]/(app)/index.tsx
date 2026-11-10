import HelpWindow from "#kitty/HelpWindow";
import AppHeader from "#components/app/AppHeader";
import Shop from "#kitty/Shop";
import CatCondition from "#kitty/CatCondition";
import PurchaseDialog, { type Purchase } from "#kitty/PurchaseDialog";
import Preview from "#kitty/Preview";
import { label } from "#kitty/labels";
import Medal from "#kitty/Medal";
import Tasks from "#kitty/Tasks";
import DashboardHelp from "#kitty/DashboardHelp";
import FriendsDock from "#kitty/FriendsDock";
import { useFocusRoom } from "#kitty/useFocusRoom";
import MenuHelp, { MenuHelpProvider, MenuHelpOverlay } from "#kitty/MenuHelp";
import TodayFocus from "#kitty/TodayFocus";
import DailyFact from "#kitty/DailyFact";
import CompanionLoading from "#kitty/CompanionLoading";
import { createSignal, createEffect, For, Show, onSettled } from "solid-js";
import { t } from "@rimelight/i18n";
import Cat from "#kitty/Cat";
import { useKitty } from "#kitty/useKitty";
import {
  MAX_HEALTH,
  nextSessionMode,
  recordJournal,
  encourage,
  durations,
  claimDaily,
  foods,
  milestones,
  rename,
  feed,
  resetTimer,
  toggle,
  type Mode,
  type Game,
} from "#kitty/game";

const names = ["Mochi", "Miso", "Maple", "Peaches", "Clover", "Biscuit", "Pip", "Honey"];
const modes: Mode[] = ["focus", "short", "long"];
const panels = ["food", "closet", "medals"] as const;

export default function Home() {
  const { game: g, ready, remaining, storageError, busy, earned, act, syncRoom } = useKitty();
  const room = useFocusRoom({ game: g, ready, busy, sync: syncRoom, act });
  const timerLocked = () =>
    busy() || Boolean(room.id() && (!room.connected() || !room.snapshot()?.host));
  const [panel, setPanel] = createSignal<(typeof panels)[number]>("food");
  const [bought, setBought] = createSignal<{ name: string; price: number } | null>(null);
  let purchaseFeedbackTimeout: ReturnType<typeof setTimeout> | undefined;
  onSettled(() => () => clearTimeout(purchaseFeedbackTimeout));
  let menuBrowser: HTMLDivElement | undefined;
  const [purchase, setPurchase] = createSignal<Purchase | null>(null);
  createEffect(
    () => Boolean(purchase()),
    (active) => {
      if (menuBrowser) menuBrowser.inert = active;
    },
  );
  const requestPurchase = (item: Purchase) => setPurchase(item);
  const [name, setName] = createSignal("");
  const [editing, setEditing] = createSignal(false);
  const hidden = () => g().health + g().bonus === 0;
  const focused = () => g().timer.deadline > 0 && g().timer.mode === "focus";
  const care = (action: (game: Game) => void) => {
    if (!focused()) act(action);
  };
  const status = () =>
    hidden() ? t("kitty.hidden") : g().health <= 2 ? t("kitty.hungry") : t("kitty.happy");
  const clock = () => {
    const s = Math.ceil(remaining() / 1000);
    return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  };
  const progress = () =>
    Math.max(0, Math.min(100, 100 * (1 - remaining() / (durations[g().timer.mode] * 1000))));
  return (
    <MenuHelpProvider>
      <div
        class={focused() ? "timer-dim-overlay active" : "timer-dim-overlay"}
        aria-hidden="true"
      />
      <AppHeader />
      <div class="workspace">
        <Show when={ready()}>
          <div class="workspace-top">
            <DailyFact day={g().day} />
            <Show when={g().adopted}>
              <div class="header-pocket-money">
                <Preview item="coins" />
                <span>
                  <strong>{t("kitty.daily")}</strong>
                  <small>1–3 coins · once a day</small>
                </span>
                <button
                  class="kitty-button claim-button"
                  disabled={busy() || focused() || g().gift}
                  onClick={() =>
                    care((game) => {
                      if (!busy() && !game.gift) {
                        claimDaily(game);
                      }
                    })
                  }
                >
                  {g().gift ? t("kitty.claimed") : t("kitty.claim")}
                </button>
              </div>
            </Show>
          </div>
        </Show>
        <Show when={storageError()}>
          <p role="alert" class="kitty-note">
            {t("kitty.storage")}
          </p>
        </Show>
        <Show when={busy()}>
          <p role="alert" class="kitty-note">
            {t("kitty.other-tab")}
          </p>
        </Show>
        <Show
          when={ready()}
          fallback={
            <CompanionLoading title={t("kitty.loading")} subtitle={t("ui.loading-subtitle")} />
          }
        >
          <Show
            when={g().adopted}
            fallback={
              <section class="adoption">
                <p class="eyebrow">{t("ui.eyebrow")}</p>
                <h1>{t("kitty.adopt-title")}</h1>
                <p class="kitty-muted">{t("kitty.adopt-text")}</p>
                <Cat coat={0} head={0} neck={0} state="idle" label={t("kitty.pet")} />
                <button
                  class="kitty-button kitty-primary"
                  onClick={() =>
                    act((game) => {
                      game.adopted = true;
                      game.name = names[Math.floor(Math.random() * names.length)] ?? "Mochi";
                      game.coat = 0;
                      recordJournal(
                        game,
                        "hello",
                        `${game.name} joined your little space. Your first chapter begins.`,
                      );
                      encourage(game);
                    })
                  }
                >
                  {t("kitty.adopt")}
                </button>
              </section>
            }
          >
            <div class="dashboard-with-guide">
              <FriendsDock room={room} busy={busy()} />
              <div class="focus-layout">
                <section class="focus-desk" aria-label={t("timer.mode")}>
                  <div class="timer-sheet">
                    <p class="focus-eyebrow">
                      {focused() ? "A little focus, a little company" : "Time to focus"}
                    </p>
                    <h1 class="desk-title">
                      {g().timer.mode === "focus" ? t("ui.desk-title") : t("ui.break-title")}
                    </h1>
                    <p class="desk-subtitle">{t("ui.desk-subtitle")}</p>
                    <div class="mode-switch" role="group" aria-label={t("timer.mode")}>
                      <For each={modes}>
                        {(mode) => (
                          <button
                            type="button"
                            aria-pressed={g().timer.mode === mode ? "true" : "false"}
                            disabled={timerLocked()}
                            onClick={() =>
                              room.id()
                                ? room.control("mode", mode)
                                : act((game) => resetTimer(game, mode))
                            }
                          >
                            {t(`timer.${mode}`)}
                          </button>
                        )}
                      </For>
                    </div>
                    <div role="timer" class="focus-clock">
                      {clock()}
                    </div>
                    <p class="current-task-caption">
                      {g().tasks.find((task) => task.id === g().currentTask && !task.done)
                        ? `Working on: ${g().tasks.find((task) => task.id === g().currentTask)?.text}`
                        : "Choose Focus beside a task to work on it here."}
                    </p>
                    <progress
                      class="timer-progress"
                      max="100"
                      value={progress()}
                      aria-label={t("timer.mode")}
                    />
                    <p class="session-caption">
                      {Math.max(
                        0,
                        Math.floor(durations[g().timer.mode] / 60 - remaining() / 60000),
                      )}{" "}
                      {g().timer.mode === "focus"
                        ? t("timer.minutes-focused")
                        : t("timer.minutes-rested")}{" "}
                      · {durations[g().timer.mode] / 60} {t("timer.minute-session")}
                    </p>
                    <div class="timer-actions">
                      <button
                        type="button"
                        class="kitty-button kitty-primary start-button"
                        disabled={timerLocked()}
                        onClick={() =>
                          room.id()
                            ? room.control(
                                "toggle",
                                remaining() === 0 ? nextSessionMode(g()) : undefined,
                              )
                            : act((game) => {
                                if (!game.timer.remaining && !game.timer.deadline)
                                  resetTimer(game, nextSessionMode(game));
                                toggle(game, Date.now());
                              })
                        }
                      >
                        <svg class="timer-action-icon" viewBox="0 0 24 24" aria-hidden="true">
                          <Show
                            when={g().timer.deadline}
                            fallback={
                              <path
                                d="M8 5.5 Q6 4.5 6 7v10q0 2.5 2 1.5l11-6q2-1 0-2Z"
                                fill="currentColor"
                              />
                            }
                          >
                            <rect x="5" y="4" width="5" height="16" rx="2" fill="currentColor" />
                            <rect x="14" y="4" width="5" height="16" rx="2" fill="currentColor" />
                          </Show>
                        </svg>
                        {g().timer.deadline
                          ? t("timer.pause")
                          : remaining() === 0
                            ? g().timer.mode === "focus"
                              ? nextSessionMode(g()) === "long"
                                ? "Take a long break"
                                : "Take a short break"
                              : "Back to focus"
                            : g().timer.started && remaining() > 0
                              ? t("timer.resume")
                              : g().timer.mode === "focus"
                                ? t("ui.start-focus")
                                : t("ui.start-break")}
                      </button>
                      <button
                        type="button"
                        class="kitty-button reset-button"
                        disabled={timerLocked()}
                        onClick={() =>
                          room.id() ? room.control("reset") : act((game) => resetTimer(game))
                        }
                      >
                        {t("timer.reset")}
                      </button>
                    </div>
                    <p class="timer-reward kitty-muted">
                      {g().timer.mode === "focus" ? t("kitty.focus-reward") : t("ui.break-reward")}
                    </p>
                    <Show when={room.id()}>
                      <p class="shared-timer-note" role="status">
                        {!room.connected()
                          ? "Reconnecting to your shared timer…"
                          : room.snapshot()?.host
                            ? "You’re hosting · your friend follows this timer"
                            : "Focusing together · your friend controls the timer"}
                      </p>
                    </Show>
                    <Show when={earned() > 0}>
                      <p role="status" class="earned-note">
                        +{earned()} {t("kitty.earned")}
                      </p>
                    </Show>
                  </div>
                  <Tasks game={g()} act={act} />
                  <TodayFocus game={g()} act={act} />
                </section>

                <aside class="companion">
                  <MenuHelpOverlay />
                  <DashboardHelp game={g()} />
                  <p class="companion-eyebrow">Your companion</p>
                  <div class="companion-topline">
                    <div class="companion-heading">
                      <div class="cat-name">
                        <h2>{g().name}</h2>
                        <button
                          type="button"
                          class="quiet-button rename-button"
                          disabled={focused() || g().renames >= 3}
                          aria-label={t("kitty.rename")}
                          onClick={() => {
                            setName(g().name);
                            setEditing(!editing());
                          }}
                        >
                          <Preview item="pencil" />
                        </button>
                      </div>
                    </div>
                    <CatCondition game={g()} />
                    <span class="coin-balance companion-coins">
                      <Preview item="coins" />
                      {g().coins.toLocaleString("en-US")} {t("kitty.coins")}
                    </span>
                  </div>
                  <HelpWindow
                    open={editing()}
                    title="Rename your companion"
                    close={() => setEditing(false)}
                    class="rename-window"
                  >
                    <form
                      class="rename-form"
                      onSubmit={(e) => {
                        e.preventDefault();
                        care((game) => {
                          if (rename(game, name())) setEditing(false);
                        });
                      }}
                    >
                      <label class="sr-only" for="cat-name">
                        {t("kitty.name")}
                      </label>
                      <input
                        id="cat-name"
                        maxlength={20}
                        value={name()}
                        required
                        onInput={(e) => setName(e.currentTarget.value)}
                      />
                      <button
                        class="kitty-button"
                        disabled={
                          !name().trim() ||
                          name().trim() === g().name ||
                          g().coins < ([0, 5, 10][g().renames] ?? Infinity)
                        }
                      >
                        {t("kitty.save")} · {[0, 5, 10][g().renames]} {t("kitty.coins")}
                      </button>
                    </form>
                  </HelpWindow>

                  <div class="companion-upper">
                    <div class="companion-room">
                      <Cat
                        friend={room.snapshot()?.friend ?? undefined}
                        friendOnline={room.connected() && Boolean(room.snapshot()?.friend?.online)}
                        bowl={g().bowl}
                        waterLabel={t("kitty.water")}
                        coat={g().coat}
                        head={g().head}
                        neck={g().neck}
                        state={
                          hidden()
                            ? "hidden"
                            : g().timer.deadline
                              ? focused()
                                ? "focus"
                                : "break"
                              : "idle"
                        }
                        label={t("kitty.pet")}
                      />
                      <p role="status" class="cat-status">
                        {status()}
                      </p>
                    </div>
                  </div>
                  <div class="companion-controls">
                    <nav class="companion-tabs" aria-label={t("kitty.menu")}>
                      <For each={panels}>
                        {(tab) => (
                          <button
                            type="button"
                            aria-pressed={panel() === tab ? "true" : "false"}
                            aria-controls="companion-panel"
                            onClick={() => {
                              setPurchase(null);
                              setPanel(tab);
                            }}
                          >
                            <Preview item={tab} />
                            {t.raw(`kitty.${tab}`)}
                          </button>
                        )}
                      </For>
                    </nav>
                    <div
                      id="companion-panel"
                      class="companion-panel"
                      tabindex="0"
                      role="region"
                      aria-label={t.raw(`kitty.${panel()}`)}
                    >
                      <Show when={purchase()}>
                        {(item) => (
                          <PurchaseDialog
                            purchase={item()}
                            balance={g().coins}
                            locked={focused() || busy()}
                            cancel={() => setPurchase(null)}
                            confirm={() => {
                              const selected = purchase();
                              if (!selected || focused() || busy() || g().coins < selected.price)
                                return;
                              care((game) => {
                                if (game.coins >= selected.price) {
                                  const before = game.coins;
                                  selected.action(game);
                                  const spent = before - game.coins;
                                  if (spent > 0) {
                                    clearTimeout(purchaseFeedbackTimeout);
                                    setBought({ name: selected.name, price: spent });
                                    purchaseFeedbackTimeout = setTimeout(
                                      () => setBought(null),
                                      3500,
                                    );
                                  }
                                }
                              });
                              setPurchase(null);
                            }}
                          />
                        )}
                      </Show>
                      <div
                        class="menu-browser"
                        ref={(el) => {
                          menuBrowser = el;
                        }}
                      >
                        <Show when={focused()}>
                          <p class="kitty-note">{t("kitty.focus-quiet")}</p>
                        </Show>
                        <Show when={panel() === "food"}>
                          <div class="menu-page">
                            <header class="menu-header">
                              <h3 class="kitty-heading">{t("kitty.food-title")}</h3>
                              <MenuHelp title="Food & care points" label={t("ui.food-help")}>
                                <ul>
                                  <li>
                                    <strong>Restore hearts:</strong> each meal shows its red-heart
                                    and golden bonus-heart amounts. Meals that cannot help are
                                    unavailable.
                                  </li>
                                  <li>
                                    <strong>Care points available: {g().careCredits}.</strong>{" "}
                                    Complete a focus session to earn one more.
                                  </li>
                                  <li>
                                    <strong>Counted feeds:</strong> a useful meal spends one care
                                    point and advances accessory and medal milestones.
                                  </li>
                                  <li>
                                    <strong>No point? Still a meal.</strong> Food restores hearts
                                    even when it cannot advance milestones.
                                  </li>
                                </ul>
                              </MenuHelp>
                            </header>
                            <div class="menu-list food-list">
                              <Show when={hidden()}>
                                <div class="kitty-note">
                                  <p>{t("kitty.rescue-text")}</p>
                                  <button
                                    class="kitty-button"
                                    disabled={focused()}
                                    onClick={() =>
                                      care((game) => {
                                        game.health = 2;
                                        game.hunger = 0;
                                      })
                                    }
                                  >
                                    {t("kitty.rescue")}
                                  </button>
                                </div>
                              </Show>
                              <For each={foods}>
                                {(food, i) => (
                                  <div
                                    class={`care-row ${bought()?.name === label("food", i()) ? "just-purchased" : ""}`}
                                  >
                                    <Preview item={`food-${i()}`} />
                                    <span class="care-label">
                                      <strong>{label("food", i())}</strong>
                                      <small>
                                        +{food.heal / 2} {t("kitty.hearts")}
                                        {food.bonus
                                          ? ` · +${food.bonus / 2} ${t("kitty.bonus")}`
                                          : ""}
                                      </small>
                                    </span>
                                    <span class="product-state" role="status" aria-live="polite">
                                      {bought()?.name === label("food", i())
                                        ? `Bought · ${bought()!.price} coins`
                                        : hidden()
                                          ? "Bring your cat back first"
                                          : g().health === MAX_HEALTH &&
                                              (!food.bonus || g().bonus === 12)
                                            ? "Already full"
                                            : g().coins < food.price
                                              ? `Need ${food.price - g().coins} more coins`
                                              : "Ready to feed"}
                                    </span>
                                    <button
                                      class="kitty-button"
                                      aria-label={`${label("food", i())} · ${food.price} ${t("kitty.coins")}`}
                                      disabled={
                                        focused() ||
                                        hidden() ||
                                        g().coins < food.price ||
                                        (g().health === MAX_HEALTH &&
                                          (!food.bonus || g().bonus === 12))
                                      }
                                      onClick={() =>
                                        requestPurchase({
                                          name: label("food", i()),
                                          price: food.price,
                                          art: `food-${i()}`,
                                          action: (game) => {
                                            feed(game, i());
                                          },
                                        })
                                      }
                                    >
                                      <Preview item="coins" />
                                      {food.price} {t("kitty.coins")}
                                    </button>
                                  </div>
                                )}
                              </For>
                            </div>
                          </div>
                        </Show>
                        <Show when={panel() === "closet"}>
                          <Shop
                            game={g()}
                            locked={focused()}
                            act={care}
                            purchase={requestPurchase}
                            recentPurchase={bought()?.name ?? ""}
                          />
                        </Show>
                        <Show when={panel() === "medals"}>
                          <div class="menu-page">
                            <header class="menu-header">
                              <h3 class="kitty-heading">{t("kitty.medals-title")}</h3>
                              <p class="kitty-muted">
                                {g().feeds} {t("kitty.lifetime")}
                              </p>
                            </header>
                            <div class="menu-list">
                              <For each={milestones}>
                                {(count, i) => (
                                  <div
                                    class={`care-row ${g().feeds < count ? "medal-locked" : ""}`}
                                  >
                                    <Medal level={i()} />
                                    <span class="care-label">
                                      <strong>{label("medal", i())}</strong>
                                      <small>
                                        {count} {t("kitty.feeds")}
                                      </small>
                                    </span>
                                    <span class="milestone-progress">
                                      <span>
                                        {g().feeds >= count
                                          ? t("ui.earned")
                                          : `${g().feeds}/${count}`}
                                      </span>
                                      <progress
                                        max={count}
                                        value={Math.min(g().feeds, count)}
                                        aria-label={label("medal", i())}
                                      />
                                    </span>
                                  </div>
                                )}
                              </For>
                            </div>
                          </div>
                        </Show>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </Show>
        </Show>
      </div>
    </MenuHelpProvider>
  );
}
