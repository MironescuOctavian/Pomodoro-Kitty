import { createEffect, createSignal, For, Show } from "solid-js";
import { t } from "@rimelight/i18n";
import { label } from "./labels";
import { coats, prices, equip, milestones, recordJournal, type Game } from "./game";
import Preview from "./Preview";
import MenuHelp from "./MenuHelp";
import { coatCatalog } from "./coats";
import type { Purchase } from "./PurchaseDialog";

export default function Shop(props: {
  game: Game;
  recentPurchase: string;
  locked: boolean;
  act: (action: (g: Game) => void) => void;
  purchase: (item: Purchase) => void;
}) {
  let list!: HTMLDivElement;
  const [closetTab, setClosetTab] = createSignal<"coats" | "accessories">("coats");
  const [coatGroup, setCoatGroup] = createSignal("all");
  createEffect(
    () => `${closetTab()}:${coatGroup()}`,
    () => {
      if (list) list.scrollTop = 0;
    },
  );
  const change = (action: (g: Game) => void) => {
    if (!props.locked) props.act(action);
  };
  const buy = (item: Purchase, owned = false) => {
    if (props.locked) return;
    if (owned || item.price === 0) change(item.action);
    else props.purchase(item);
  };
  return (
    <div class="menu-page shop-panel">
      <div class="menu-header shop-header">
        <h3 class="kitty-heading">
          {t("kitty.closet-title")}{" "}
          <MenuHelp title="Your closet">
            <p>
              Coats are cosmetic. Buy a coat once, then equip it for free whenever you like.
              Accessories unlock through feeding milestones. Feeding counts toward milestones when
              you have a care point earned from focus.
            </p>
          </MenuHelp>
        </h3>
        <p class="kitty-muted">{t("ui.closet-help")}</p>
      </div>
      <div class="menu-toolbar">
        <div class="shop-categories">
          <For each={["coats", "accessories"] as const}>
            {(tab) => (
              <button
                class="shop-category"
                aria-pressed={closetTab() === tab ? "true" : "false"}
                onClick={() => setClosetTab(tab)}
              >
                {tab === "coats" ? "Coats" : t("kitty.accessories")}
              </button>
            )}
          </For>
        </div>
        <Show when={closetTab() === "coats"}>
          <label class="coat-filter">
            <span class="sr-only">Coat collection</span>
            <select
              value={coatGroup()}
              onChange={(event) => setCoatGroup(event.currentTarget.value)}
            >
              <option value="all">All {coatCatalog.length} coats</option>
              <option value="domestic">Domestic coats</option>
              <option value="wild">Wild collection</option>
            </select>
          </label>
        </Show>
        <Show when={closetTab() === "accessories"}>
          <span class="accessory-progress">
            {props.game.feeds} counted feeds · {props.game.careCredits} care points
            <MenuHelp title="Accessory milestones">
              <p>
                Finish a focus session to earn one care point. Feeding your cat uses one point and
                adds one counted feed toward accessories and medals. Extra feeding still heals your
                cat, but does not advance milestones without a point.
              </p>
              <p>
                {milestones.find((count) => count > props.game.feeds)
                  ? `Next unlock: ${milestones.find((count) => count > props.game.feeds)} counted feeds.`
                  : "All accessory milestones unlocked."}
              </p>
            </MenuHelp>
          </span>
          <button
            class="kitty-button collection-remove"
            disabled={props.locked || (!props.game.head && !props.game.neck)}
            onClick={() =>
              change((g) => {
                g.head = 0;
                g.neck = 0;
              })
            }
          >
            {t("kitty.remove")}
          </button>
        </Show>
      </div>
      <div
        class="menu-list shop-items"
        ref={(el) => {
          list = el;
        }}
      >
        {" "}
        <Show when={closetTab() === "coats"}>
          <div class="product-grid">
            <For each={coats}>
              {(color, i) => (
                <Show
                  when={
                    coatGroup() === "all" ||
                    (coatGroup() === "wild" ? coatCatalog[i()]?.wild : !coatCatalog[i()]?.wild)
                  }
                >
                  <div
                    class={`pal-product closet-product ${props.recentPurchase === label("coat", i()) ? "just-purchased" : ""}`}
                  >
                    <Preview item="coat" color={color} />
                    <strong>{label("coat", i())}</strong>
                    <span class="closet-description">{coatCatalog[i()]?.description}</span>
                    <span class="product-state">
                      {props.game.coat === i()
                        ? "Equipped"
                        : props.game.owned.includes(i())
                          ? "Owned"
                          : props.game.coins < (prices[i()] ?? 0)
                            ? `Need ${(prices[i()] ?? 0) - props.game.coins} more coins`
                            : "Available to buy"}
                    </span>
                    <button
                      class="kitty-button"
                      disabled={
                        props.locked ||
                        props.game.coat === i() ||
                        (!props.game.owned.includes(i()) &&
                          props.game.coins < (prices[i()] ?? Infinity))
                      }
                      aria-pressed={props.game.coat === i() ? "true" : "false"}
                      onClick={() =>
                        buy(
                          {
                            name: label("coat", i()),
                            price: prices[i()] ?? 0,
                            art: "coat",
                            color,
                            action: (g) => {
                              equip(g, "coat", i());
                            },
                          },
                          props.game.owned.includes(i()),
                        )
                      }
                    >
                      {props.game.coat === i() ? (
                        "Equipped"
                      ) : props.game.owned.includes(i()) ? (
                        "Equip"
                      ) : (
                        <>
                          <Preview item="coins" />
                          {prices[i()]} coins
                        </>
                      )}
                    </button>
                  </div>
                </Show>
              )}
            </For>
          </div>
        </Show>
        <Show when={closetTab() === "accessories"}>
          <div class="product-grid">
            <For each={milestones}>
              {(count, i) => (
                <div class="pal-product closet-product">
                  <Preview
                    item={
                      ({ 4: "hat", 6: "flower", 8: "hat", 10: "crown" } as Record<number, string>)[
                        i()
                      ] ?? (i() % 2 ? "collar" : "bow")
                    }
                  />
                  <strong>{label("accessory", i())}</strong>
                  <span class="closet-description">Unlock at {count} feeds</span>
                  <span class="product-state">
                    {props.game.feeds < count
                      ? `${props.game.feeds}/${count} ${t("kitty.feeds")}`
                      : (i() % 2 ? props.game.neck : props.game.head) === i() + 1
                        ? "Equipped"
                        : "Unlocked"}
                  </span>
                  <button
                    class="kitty-button"
                    disabled={
                      props.locked ||
                      props.game.feeds < count ||
                      (i() % 2 ? props.game.neck : props.game.head) === i() + 1
                    }
                    onClick={() =>
                      change((g) => {
                        g[i() % 2 ? "neck" : "head"] = i() + 1;
                        recordJournal(
                          g,
                          "collection",
                          `${g.name} put on ${label("accessory", i())}. Looking lovely!`,
                        );
                      })
                    }
                  >
                    {(i() % 2 ? props.game.neck : props.game.head) === i() + 1
                      ? "Equipped"
                      : props.game.feeds < count
                        ? "Locked"
                        : "Equip"}
                  </button>
                </div>
              )}
            </For>
          </div>
        </Show>
      </div>
    </div>
  );
}
