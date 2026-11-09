import { onSettled, Show } from "solid-js";
import type { Game } from "./game";
import Preview from "./Preview";

export type Purchase = {
  name: string;
  price: number;
  art: string;
  color?: string | undefined;
  action: (game: Game) => void;
};

export default function PurchaseDialog(props: {
  purchase: Purchase;
  balance: number;
  locked: boolean;
  cancel: () => void;
  confirm: () => void;
}) {
  let cancelButton!: HTMLButtonElement;
  onSettled(() => {
    const previous = document.activeElement;
    cancelButton.focus();
    return () => {
      if (previous instanceof HTMLElement && previous.isConnected) previous.focus();
    };
  });
  return (
    <section
      class="menu-page purchase-page"
      role="group"
      aria-labelledby="purchase-title"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          props.cancel();
        }
      }}
    >
      <div class="purchase-preview">
        <Preview item={props.purchase.art} color={props.purchase.color ?? ""} />
      </div>
      <h3 id="purchase-title">Buy {props.purchase.name}?</h3>
      <p>
        This costs <strong>{props.purchase.price} coins</strong>.
      </p>
      <p class="purchase-balance">
        {props.balance} coins now · {Math.max(0, props.balance - props.purchase.price)} after
        purchase
      </p>
      <Show when={props.locked || props.balance < props.purchase.price}>
        <p role="status">
          {props.locked
            ? "Pause focus to shop."
            : `You need ${props.purchase.price - props.balance} more coins.`}
        </p>
      </Show>
      <div class="purchase-actions">
        <button
          type="button"
          class="kitty-button"
          ref={(el) => {
            cancelButton = el;
          }}
          onClick={() => props.cancel()}
        >
          Cancel
        </button>
        <button
          type="button"
          class="kitty-button claim-button"
          disabled={props.locked || props.balance < props.purchase.price}
          onClick={() => props.confirm()}
        >
          Buy · {props.purchase.price} coins
        </button>
      </div>
    </section>
  );
}
