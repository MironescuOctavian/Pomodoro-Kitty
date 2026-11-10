import assert from "node:assert/strict";
import { createRequire } from "node:module";

// Use the WebSocket client already shipped with Cloudflare's local runtime.
const cfRequire = createRequire(import.meta.resolve("cf"));
const runtimeRequire = createRequire(cfRequire.resolve("miniflare"));
const { WebSocket } = runtimeRequire("undici");
const origin = process.env.FOCUS_ROOM_URL ?? "http://127.0.0.1:5173";
const clients = [];
const cat = { name: "Maple", coat: 0, head: 0, neck: 0 };

function client(id, token) {
  const socket = new WebSocket(`${origin.replace(/^http/, "ws")}/api/rooms/${id}?token=${token}`, {
    headers: { Origin: origin },
  });
  clients.push(socket);
  let latest;
  const waiters = new Set();
  socket.addEventListener("message", (event) => {
    if (event.data === "pong") return;
    latest = JSON.parse(event.data);
    for (const notify of waiters) notify();
  });
  return {
    socket,
    send: (message) => socket.send(JSON.stringify(message)),
    wait: (predicate) =>
      new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          waiters.delete(check);
          reject(
            new Error(`Timed out: ${predicate.toString()}, latest: ${JSON.stringify(latest)}`),
          );
        }, 5000);
        const check = () => {
          if (!latest || !predicate(latest)) return;
          clearTimeout(timeout);
          waiters.delete(check);
          resolve(latest);
        };
        waiters.add(check);
        check();
      }),
  };
}

try {
  assert.equal(
    (
      await fetch(`${origin}/api/rooms/create`, {
        method: "POST",
        headers: { Origin: "https://other.example" },
      })
    ).status,
    403,
  );
  const response = await fetch(`${origin}/api/rooms/create`, {
    method: "POST",
    headers: { Origin: origin },
  });
  assert.equal(response.status, 200);
  const { id, token } = await response.json();
  const host = client(id, token);
  await host.wait((state) => state.host);
  host.send({ type: "profile", cat });
  const guestToken = crypto.randomUUID();
  const guest = client(id, guestToken);
  await guest.wait((state) => !state.host && state.friend?.name === "Maple");
  guest.send({ type: "profile", cat: { ...cat, name: "Miso", coat: 1 } });
  await host.wait((state) => state.friend?.name === "Miso" && state.friend.online);

  const denied = await fetch(`${origin}/api/rooms/${id}?token=${crypto.randomUUID()}`, {
    method: "POST",
    headers: { Origin: origin },
  });
  assert.equal(denied.status, 409);
  guest.send({ type: "timer", action: "mode", mode: "long" });
  guest.send({ type: "profile", cat: { ...cat, name: "Miso updated" } });
  assert.equal(
    (await host.wait((state) => state.friend?.name === "Miso updated")).timer.mode,
    "focus",
  );
  host.send({ type: "timer", action: "toggle" });
  const started = await guest.wait((state) => state.timer.deadline > 0);
  assert.equal(
    (await host.wait((state) => state.timer.deadline > 0)).timer.deadline,
    started.timer.deadline,
  );
  host.send({ type: "timer", action: "toggle" });
  const paused = await guest.wait((state) => !state.timer.deadline && state.timer.started);
  assert.ok(paused.timer.remaining <= 1500000);

  guest.socket.close();
  await host.wait((state) => state.friend && !state.friend.online);
  const returning = client(id, guestToken);
  assert.equal(
    (await returning.wait((state) => state.timer.started)).timer.session,
    paused.timer.session,
  );
  await host.wait((state) => state.friend?.online);
  host.send({ type: "leave" });
  await returning.wait((state) => state.host && state.friend === null);
  returning.send({ type: "timer", action: "mode", mode: "short" });
  await returning.wait((state) => state.timer.mode === "short");
  returning.send({ type: "leave" });
  console.log(
    "PASS: origin protection, invites, two-person limit, profiles, host-only timer, shared deadlines, pause, reconnect and host transfer.",
  );
} finally {
  for (const socket of clients) socket.close();
}
