import {
  createContext,
  createSignal,
  useContext,
  Show,
  type ParentProps,
  type Accessor,
} from "solid-js";
import type { JSX } from "@solidjs/web";
type Explanation = { title: string; content: JSX.Element };
const HelpContext = createContext<{
  selected: Accessor<Explanation | null>;
  select: (value: Explanation | null) => void;
}>();
export function MenuHelpProvider(props: ParentProps) {
  const [selected, setSelected] = createSignal<Explanation | null>(null);
  return (
    <HelpContext value={{ selected, select: (value) => setSelected(value) }}>
      {props.children}
    </HelpContext>
  );
}
export function MenuHelpPanel() {
  const help = useContext(HelpContext)!;
  return (
    <section class="sidebar-explanation" aria-label="Menu explanation" aria-live="polite">
      <Show
        when={help.selected()}
        fallback={
          <div class="explanation-placeholder">
            <strong>A little guidance</strong>
            <p>Click a ? indicator in the cat menus to learn how it works.</p>
          </div>
        }
      >
        {(item) => (
          <>
            <header>
              <h3>{item().title}</h3>
              <button
                type="button"
                class="menu-help-close"
                aria-label="Close explanation"
                onClick={() => help.select(null)}
              >
                ×
              </button>
            </header>
            <div class="menu-help-copy">{item().content}</div>
          </>
        )}
      </Show>
    </section>
  );
}
export default function MenuHelp(
  props: ParentProps<{ title: string; label?: string; trigger?: JSX.Element; class?: string }>,
) {
  const help = useContext(HelpContext)!;
  return (
    <button
      type="button"
      class={props.class ?? "menu-help-button"}
      title="Explain in the guide panel"
      aria-label={props.label ?? props.title}
      aria-pressed={help.selected()?.title === props.title ? "true" : "false"}
      onClick={() => help.select({ title: props.title, content: props.children })}
    >
      {props.trigger}
      <span class="help-indicator" aria-hidden="true">
        ?
      </span>
      {props.label}
    </button>
  );
}
