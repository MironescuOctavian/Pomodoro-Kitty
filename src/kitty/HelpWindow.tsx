import { createEffect, Show, type ParentProps } from "solid-js";

/** A companion-local window: blur and keyboard handling never affect the timer. */
export default function HelpWindow(
  props: ParentProps<{ open: boolean; title: string; close: () => void; class?: string }>,
) {
  let dialog!: HTMLDialogElement;
  let previousFocus: HTMLElement | null = null;
  createEffect(
    () => props.open,
    (open) => {
      if (open && !dialog.open) {
        previousFocus =
          document.activeElement instanceof HTMLElement ? document.activeElement : null;
        dialog.show();
        dialog
          .querySelector<HTMLButtonElement>(".help-window-close")
          ?.focus({ preventScroll: true });
        const rect = dialog.getBoundingClientRect();
        if (matchMedia("(max-width: 900px)").matches && (rect.top < 0 || rect.bottom > innerHeight))
          dialog.scrollIntoView({ block: "center" });
      } else if (!open && dialog.open) {
        dialog.close();
        previousFocus?.focus({ preventScroll: true });
      }
      if (!open) return;
      const keydown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          event.preventDefault();
          props.close();
        }
        if (event.key === "Tab") {
          const items = Array.from(
            dialog.querySelectorAll<HTMLElement>(
              'button:not(:disabled), a[href], input:not(:disabled), select, summary, [tabindex="0"]',
            ),
          ).filter((item) => item.getClientRects().length);
          const first = items[0];
          const last = items[items.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus({ preventScroll: true });
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus({ preventScroll: true });
          }
        }
      };
      dialog.addEventListener("keydown", keydown);
      return () => dialog.removeEventListener("keydown", keydown);
    },
  );
  return (
    <>
      <Show when={props.open}>
        <div class="companion-help-shade" onClick={() => props.close()} aria-hidden="true" />
      </Show>
      <dialog
        ref={(element) => {
          dialog = element;
        }}
        class={`help-window ${props.class ?? ""}`}
        aria-label={props.title}
        onCancel={(event) => {
          event.preventDefault();
          props.close();
        }}
        onClose={() => props.close()}
        onClick={(event) => {
          if (event.target === dialog) {
            const rect = dialog.getBoundingClientRect();
            if (
              event.clientX < rect.left ||
              event.clientX > rect.right ||
              event.clientY < rect.top ||
              event.clientY > rect.bottom
            )
              props.close();
          }
        }}
      >
        <header class="help-window-header">
          <h2>{props.title}</h2>
          <button
            type="button"
            class="help-window-close"
            aria-label="Close window"
            onClick={() => props.close()}
          >
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
              <path
                d="m5 5 10 10M15 5 5 15"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </header>
        <div class="help-window-content">{props.children}</div>
      </dialog>
    </>
  );
}
