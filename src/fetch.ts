import { handleRequest } from "virtual:solid-ssr-handler";
import { Hono } from "hono";
import { i18n } from "@rimelight/i18n/middleware";
import { roomId } from "./kitty/room";
export { FocusRoom } from "./kitty/FocusRoom";

const app = new Hono<{ Bindings: Env }>();

app.use("/api/rooms/*", async (c, next) => {
  if (c.req.header("Origin") !== new URL(c.req.url).origin)
    return c.text("Same-origin requests required", 403);
  c.header("Cache-Control", "no-store");
  return next();
});
app.post("/api/rooms/create", async (c) => {
  const id = crypto.randomUUID();
  const response = await c.env.FOCUS_ROOMS.getByName(id).fetch(
    new Request("https://room/create", { method: "POST" }),
  );
  if (!response.ok) return c.text("Could not create room", 503);
  const credentials = await response.json<{ token: string }>();
  return c.json({ id, token: credentials.token });
});
app.on(["GET", "POST"], "/api/rooms/:id", async (c) => {
  const parsed = roomId.safeParse(c.req.param("id"));
  if (!parsed.success) return c.text("Invalid invite", 400);
  return await c.env.FOCUS_ROOMS.getByName(parsed.data).fetch(c.req.raw);
});

app.use(i18n());
app.all("*", (c) => handleRequest(c.req.raw));

export default app;
