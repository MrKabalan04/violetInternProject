import "dotenv/config";
import app from "./app.js";
import { connectDB, closeDB } from "./config/db.js";

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB();
    const server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

    async function shutdown(signal) {
      console.log(`${signal} received, shutting down`);
      server.close(async () => {
        await closeDB();
        process.exit(0);
      });
    }

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

start();
