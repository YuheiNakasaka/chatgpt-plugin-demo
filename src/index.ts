import { Hono } from "hono";
import { serveStatic } from "hono/cloudflare-workers";
import { cors } from "hono/cors";

const app = new Hono();

app.use("*", cors());
app.use(
  "/.well-known/ai-plugin.json",
  serveStatic({
    path: "./.well-known/ai-plugin.json",
  })
);
app.use(
  "/openapi.yaml",
  serveStatic({
    path: "./openapi.yaml",
  })
);
app.use(
  "/logo.png",
  serveStatic({
    path: "./logo.png",
  })
);
app.get("/", (c) => {
  return c.json({
    message: "What time is it now?",
  });
});
app.get("/time", (c) => {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");
  const hours = String(now.getUTCHours()).padStart(2, "0");
  const minutes = String(now.getUTCMinutes()).padStart(2, "0");
  const seconds = String(now.getUTCSeconds()).padStart(2, "0");
  return c.json({
    now: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
  });
});

export default app;
