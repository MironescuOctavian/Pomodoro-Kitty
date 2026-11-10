import { DurableObject } from "cloudflare:workers";
import {
  commandSchema,
  freshRoomTimer,
  changeRoomTimer,
  roomId,
  type RoomCat,
  type RoomTimer,
} from "./room";

type Member = { token: string; cat: RoomCat | null };
type Room = { host: string; members: Member[]; timer: RoomTimer; expires: number };

export class FocusRoom extends DurableObject<Env> {
  private room: Room | undefined;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    void ctx.blockConcurrencyWhile(async () => {
      this.room = await ctx.storage.get<Room>("room");
    });
    ctx.setWebSocketAutoResponse(new WebSocketRequestResponsePair("ping", "pong"));
  }

  override async fetch(request: Request) {
    const url = new URL(request.url);
    if (request.method === "POST" && url.pathname === "/create") {
      if (this.room) return new Response("Room already exists", { status: 409 });
      const host = crypto.randomUUID();
      this.room = {
        host,
        members: [{ token: host, cat: null }],
        timer: freshRoomTimer(),
        expires: Date.now() + 86400000,
      };
      await this.ctx.storage.put("room", this.room);
      await this.ctx.storage.setAlarm(this.room.expires);
      return Response.json({ token: host });
    }
    if (!this.room || this.room.expires <= Date.now())
      return new Response("This room has expired", { status: 410 });
    const parsed = roomId.safeParse(url.searchParams.get("token"));
    if (!parsed.success) return new Response("Invalid room identity", { status: 400 });
    const token = parsed.data;
    const member = this.room.members.find((entry) => entry.token === token);
    if (!member && this.room.members.length >= 2)
      return new Response("This room already has two friends", { status: 409 });
    if (request.method === "POST") return Response.json({ available: true });
    if (request.headers.get("Upgrade")?.toLowerCase() !== "websocket")
      return new Response("WebSocket required", { status: 426 });
    for (const socket of this.ctx.getWebSockets(token))
      socket.close(4001, "Connected in another tab");
    if (!member) {
      this.room.members.push({ token, cat: null });
      await this.ctx.storage.put("room", this.room);
    }
    const pair = new WebSocketPair();
    this.ctx.acceptWebSocket(pair[1], [token]);
    pair[1].serializeAttachment({ token, window: Date.now(), count: 0 });
    this.broadcast();
    return new Response(null, { status: 101, webSocket: pair[0] });
  }

  private broadcast(disconnected?: WebSocket) {
    const room = this.room;
    if (!room) return;
    for (const socket of this.ctx.getWebSockets()) {
      if (socket === disconnected) continue;
      const { token } = socket.deserializeAttachment() as { token: string };
      const friend = room.members.find((member) => member.token !== token);
      try {
        socket.send(
          JSON.stringify({
            type: "room",
            host: room.host === token,
            now: Date.now(),
            timer: room.timer,
            friend: friend?.cat
              ? {
                  ...friend.cat,
                  online: this.ctx
                    .getWebSockets(friend.token)
                    .some((peer) => peer !== disconnected && peer.readyState === WebSocket.OPEN),
                }
              : null,
          }),
        );
      } catch {
        socket.close(1011, "Please reconnect");
      }
    }
  }

  override async webSocketMessage(socket: WebSocket, message: string | ArrayBuffer) {
    if (typeof message !== "string" || message.length > 2048) {
      socket.close(1009, "Message too large");
      return;
    }
    const attachment = socket.deserializeAttachment() as {
      token: string;
      window: number;
      count: number;
    };
    if (Date.now() - attachment.window > 1000) {
      attachment.window = Date.now();
      attachment.count = 0;
    }
    if (++attachment.count > 20) {
      socket.close(1008, "Too many messages");
      return;
    }
    socket.serializeAttachment(attachment);
    let input: unknown;
    try {
      input = JSON.parse(message);
    } catch {
      socket.close(1007, "Invalid message");
      return;
    }
    const command = commandSchema.safeParse(input);
    const room = this.room;
    const member = room?.members.find((entry) => entry.token === attachment.token);
    if (!command.success || !room || !member) {
      socket.close(1008, "Invalid room message");
      return;
    }
    const event = command.data;
    if (event.type === "profile") member.cat = event.cat;
    else if (event.type === "timer") {
      if (room.host !== member.token) return;
      room.timer = changeRoomTimer(room.timer, event.action, Date.now(), event.mode);
    } else {
      room.members = room.members.filter((entry) => entry !== member);
      if (room.host === member.token) room.host = room.members[0]?.token ?? "";
      if (!room.members.length) {
        room.expires = Date.now();
        await this.ctx.storage.setAlarm(Date.now() + 1000);
      }
      socket.close(1000, "Left the room");
    }
    await this.ctx.storage.put("room", room);
    this.broadcast();
  }

  override webSocketClose(socket: WebSocket, code: number, reason: string) {
    socket.close(code === 1005 || code === 1006 ? 1000 : code, reason);
    this.broadcast(socket);
  }

  override webSocketError(socket: WebSocket) {
    socket.close(1011, "Please reconnect");
    this.broadcast(socket);
  }

  override async alarm() {
    for (const socket of this.ctx.getWebSockets()) socket.close(4004, "Room expired");
    this.room = undefined;
    await this.ctx.storage.deleteAll();
  }
}
