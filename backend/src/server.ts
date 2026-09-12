import app from "./app";
import { env } from "./config/env";
import { connectDB } from "./config/db";

async function start() {
  await connectDB();

  const server = app.listen(env.port, () => {
    console.log(`[server] DroneTV API listening on port ${env.port} (${env.nodeEnv})`);
  });

  process.on("unhandledRejection", (reason) => {
    console.error("[server] Unhandled rejection:", reason);
    server.close(() => process.exit(1));
  });
}

start();
