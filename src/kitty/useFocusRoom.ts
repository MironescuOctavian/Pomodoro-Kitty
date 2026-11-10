import { createEffect, createMemo, createSignal, onSettled, untrack } from "solid-js";
import { resetTimer, type Game, type Mode } from "./game";
import { profileSchema, roomId, snapshotSchema, type RoomSnapshot, type RoomTimer } from "./room";

export function useFocusRoom(props: {
  game: () => Game;
  ready: () => boolean;
  busy: () => boolean;
  sync: (timer: RoomTimer, serverNow: number) => void;
  act: (action: (game: Game) => void) => void;
}) {
  const [id, setId] = createSignal("");
  const [invite, setInvite] = createSignal("");
  const [snapshot, setSnapshot] = createSignal<RoomSnapshot | null>(null);
  const [status, setStatus] = createSignal("Invite one friend to focus with you.");
  const [connected, setConnected] = createSignal(false);
  const [pending, setPending] = createSignal(false);
  const [link, setLink] = createSignal("");
  const [resume, setResume] = createSignal<{ room: string; token: string } | null>(null);
  let socket: WebSocket | undefined;
  let reconnect: ReturnType<typeof setTimeout> | undefined;
  let token = "";
  let currentRoom = "";
  let stopped = false;
  let attempt = 0;

  const send = (message: unknown) => {
    if (socket?.readyState === WebSocket.OPEN) socket.send(JSON.stringify(message));
  };
  const profile = () => profileSchema.parse(props.game());
  const connect = async () => {
    if (stopped || !currentRoom || untrack(props.busy)) return;
    const url = new URL(`/api/rooms/${currentRoom}`, location.origin);
    url.searchParams.set("token", token);
    const joining = currentRoom;
    setStatus("Connecting to your focus room…");
    try {
      const response = await fetch(url, { method: "POST" });
      if (stopped || joining !== currentRoom) return;
      if ([400, 409, 410].includes(response.status)) {
        setStatus(await response.text());
        setPending(false);
        return;
      }
      if (!response.ok) throw new Error("Room unavailable");
    } catch {
      if (stopped || joining !== currentRoom) return;
      setStatus("Could not reach your room. Reconnecting…");
      setPending(false);
      reconnect = setTimeout(() => void connect(), Math.min(30000, 1000 * 2 ** attempt++));
      return;
    }
    url.protocol = location.protocol === "https:" ? "wss:" : "ws:";
    const ws = new WebSocket(url);
    socket = ws;
    setStatus("Connecting to your focus room…");
    ws.onopen = () => {
      if (socket !== ws) return;
      attempt = 0;
      setConnected(true);
      setPending(false);
      setStatus("Room connected. Your invite is ready.");
      send({ type: "profile", cat: profile() });
    };
    ws.onmessage = (event: MessageEvent<string>) => {
      if (socket !== ws || event.data === "pong") return;
      let input: unknown;
      try {
        input = JSON.parse(event.data);
      } catch {
        return;
      }
      const parsed = snapshotSchema.safeParse(input);
      if (!parsed.success) return;
      setSnapshot(parsed.data);
      props.sync(parsed.data.timer, parsed.data.now);
    };
    ws.onclose = (event) => {
      if (socket !== ws) return;
      setConnected(false);
      setPending(false);
      if (stopped) return;
      if (event.code === 4001 || event.code === 4004) {
        setStatus(event.reason);
        return;
      }
      setStatus(
        "Connection lost or room unavailable. Reconnecting… You can leave to return to solo focus.",
      );
      reconnect = setTimeout(() => void connect(), Math.min(30000, 1000 * 2 ** attempt++));
    };
  };

  const enter = (room: string, identity: string) => {
    stopped = false;
    token = identity;
    currentRoom = room;
    setId(room);
    const url = new URL(location.href);
    url.hash = `room=${room}`;
    history.replaceState(null, "", url);
    setLink(url.href);
    try {
      sessionStorage.setItem(`focus-room:${room}`, token);
    } catch {
      /* Reconnect still works for this page. */
    }
    void connect();
  };
  const create = async () => {
    if (pending() || id() || props.busy()) return;
    setPending(true);
    try {
      const response = await fetch("/api/rooms/create", { method: "POST" });
      if (!response.ok) throw new Error("Could not create a room. Please try again.");
      const data = (await response.json()) as { id: unknown; token: unknown };
      enter(roomId.parse(data.id), roomId.parse(data.token));
    } catch {
      setStatus("Could not create a room. Please try again.");
      setPending(false);
    }
  };
  const join = () => {
    if (pending() || id() || props.busy()) return;
    try {
      const url = new URL(invite().trim(), location.origin);
      if (url.origin !== location.origin) throw new Error("Invalid invite");
      const room = roomId.parse(new URLSearchParams(url.hash.slice(1)).get("room"));
      let identity: string | null = null;
      try {
        identity = sessionStorage.getItem(`focus-room:${room}`);
      } catch {
        /* Use a new identity. */
      }
      setPending(true);
      enter(room, roomId.safeParse(identity).success ? identity! : crypto.randomUUID());
    } catch {
      setStatus("Paste a valid focus room invite from this site.");
    }
  };
  const leave = () => {
    send({ type: "leave" });
    stopped = true;
    clearTimeout(reconnect);
    socket?.close(1000, "Left the room");
    socket = undefined;
    try {
      sessionStorage.removeItem(`focus-room:${id()}`);
    } catch {
      /* No stored identity. */
    }
    setId("");
    currentRoom = "";
    setResume(null);
    setSnapshot(null);
    setConnected(false);
    setPending(false);
    setLink("");
    setInvite("");
    const url = new URL(location.href);
    url.hash = "";
    history.replaceState(null, "", url);
    props.act((game) => resetTimer(game));
    setStatus("You’re back in your own space.");
  };
  const control = (action: "toggle" | "reset" | "mode", mode?: Mode) => {
    if (connected() && snapshot()?.host) send({ type: "timer", action, mode });
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link());
      setStatus("Invite copied. Send it to one friend.");
    } catch {
      setStatus("Select and copy the invite link below.");
    }
  };
  const publicCat = createMemo(() => JSON.stringify(profileSchema.parse(props.game())));
  createEffect(
    () => (connected() ? publicCat() : null),
    (cat) => {
      if (cat) send({ type: "profile", cat: JSON.parse(cat) });
    },
  );
  createEffect(
    () => (props.ready() && props.game().adopted && !props.busy() && !id() ? resume() : null),
    (saved) => {
      if (saved) enter(saved.room, saved.token);
    },
  );
  onSettled(() => {
    const room = new URLSearchParams(location.hash.slice(1)).get("room");
    if (room && roomId.safeParse(room).success) {
      let saved: string | null = null;
      try {
        saved = sessionStorage.getItem(`focus-room:${room}`);
      } catch {
        /* Show the join form. */
      }
      if (saved && roomId.safeParse(saved).success) setResume({ room, token: saved });
      else setInvite(location.href);
    }
    const interval = setInterval(() => {
      if (socket?.readyState === WebSocket.OPEN) socket.send("ping");
    }, 25000);
    return () => {
      stopped = true;
      clearTimeout(reconnect);
      clearInterval(interval);
      socket?.close();
    };
  });
  return {
    id,
    invite,
    setInvite,
    snapshot,
    status,
    connected,
    pending,
    link,
    create,
    join,
    leave,
    control,
    copy,
  };
}
export type FocusRoomControls = ReturnType<typeof useFocusRoom>;
