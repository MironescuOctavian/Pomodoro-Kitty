import { handleRequest } from "virtual:solid-ssr-handler";
import { Hono } from "hono";
import { i18n } from "@rimelight/i18n/middleware";

const app = new Hono<{ Bindings: Env }>();

app.use(i18n());
app.all("*", (c) => handleRequest(c.req.raw));

export default app;
