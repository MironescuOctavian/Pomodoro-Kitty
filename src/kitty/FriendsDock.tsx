import { createSignal } from "solid-js";
import HelpWindow from "./HelpWindow";
import Friends from "./Friends";
import type { FocusRoomControls } from "./useFocusRoom";

export default function FriendsDock(props: { room: FocusRoomControls; busy: boolean }) {
  const [open, setOpen] = createSignal(false);
  return (
    <>
      <aside class="friends-sidecar">
        <nav class="dashboard-help-dock" aria-label="Focus together">
          <button type="button" aria-haspopup="dialog" onClick={() => setOpen(true)}>
            <span aria-hidden="true">♡</span> Focus together
          </button>
        </nav>
        <p class="friends-dock-status">
          {props.room.id()
            ? props.room.connected()
              ? "Two cats, one cozy space"
              : "Reconnecting…"
            : "Save a spot for a friend"}
        </p>
      </aside>
      <HelpWindow
        open={open() || Boolean(props.room.invite() && !props.room.id())}
        title="Focus together"
        close={() => {
          setOpen(false);
          if (!props.room.id()) props.room.setInvite("");
        }}
        class="friends-window"
      >
        <Friends room={props.room} busy={props.busy} />
      </HelpWindow>
    </>
  );
}
