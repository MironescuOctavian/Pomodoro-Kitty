import { Show } from "solid-js";
import type { FocusRoomControls } from "./useFocusRoom";

export default function Friends(props: { room: FocusRoomControls; busy: boolean }) {
  return (
    <section class="friends-panel">
      <p>
        A little company makes focus cozier. Invite one friend and their cat will sit beside yours.
      </p>
      <p role="status" aria-live="polite">
        {props.room.status()}
      </p>
      <Show
        when={props.room.id()}
        fallback={
          <>
            <button
              class="kitty-button kitty-primary"
              disabled={props.busy || props.room.pending()}
              onClick={() => void props.room.create()}
            >
              Create an invite
            </button>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                props.room.join();
              }}
            >
              <label for="friend-invite">Have an invite?</label>
              <input
                id="friend-invite"
                type="url"
                placeholder="Paste your friend’s invite link"
                value={props.room.invite()}
                onInput={(event) => props.room.setInvite(event.currentTarget.value)}
                required
              />
              <button class="kitty-button" disabled={props.busy || props.room.pending()}>
                Join friend
              </button>
            </form>
          </>
        }
      >
        <label for="room-invite">Your private invite</label>
        <input
          id="room-invite"
          value={props.room.link()}
          readonly
          onFocus={(event) => event.currentTarget.select()}
        />
        <div class="friends-actions">
          <button class="kitty-button" onClick={() => void props.room.copy()}>
            Copy invite
          </button>
          <button class="kitty-button" onClick={() => props.room.leave()}>
            Leave room
          </button>
        </div>
        <p>
          {props.room.snapshot()?.friend
            ? `${props.room.snapshot()!.friend!.name} is ${props.room.connected() && props.room.snapshot()!.friend!.online ? "here with you" : "reconnecting"}.`
            : "A spot by the bookshelf is waiting for your friend."}
        </p>
        <p>
          {props.room.snapshot()?.host
            ? "You control the shared timer."
            : "Your friend controls the shared timer."}{" "}
          Leaving resets your timer for solo focus.
        </p>
      </Show>
      <small>
        Rooms last 24 hours. Only cat names and outfits are shared. Keep your invite private. Join
        before a session starts to earn your own rewards.
      </small>
    </section>
  );
}
