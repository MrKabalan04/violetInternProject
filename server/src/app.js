import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import sequelize from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import contentRoutes from "./routes/content.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const uploadsDir = fileURLToPath(new URL("../uploads", import.meta.url));
const clientDist = fileURLToPath(new URL("../../client/dist", import.meta.url));
const clientIndex = path.join(clientDist, "index.html");

const app = express();

app.set("trust proxy", 1);
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN
      ? process.env.CLIENT_ORIGIN.split(",").map((origin) => origin.trim())
      : true,
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use("/uploads", express.static(uploadsDir));

app.get("/api/health", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ status: "ok", database: "connected" });
  } catch (error) {
    console.error("Health check failed:", error.message);
    res.status(503).json({ status: "error", database: "unavailable" });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api", contentRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

if (existsSync(clientIndex)) {
  app.use(express.static(clientDist));
  app.use((req, res, next) => {
    if (req.method !== "GET") return next();
    res.sendFile(clientIndex);
  });
}

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((error, req, res, next) => {
  if (error.name === "MulterError") {
    const message =
      error.code === "LIMIT_FILE_SIZE"
        ? "Image must be 5 MB or smaller"
        : "Upload failed";
    return res.status(400).json({ message });
  }
  if (error.name === "SequelizeValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: error.errors.map((entry) => entry.message),
    });
  }
  if (error.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({ message: "Resource already exists" });
  }

  const status = error.statusCode || 500;

  if (status >= 500) {
    console.error(error);
  }

  res.status(status).json({
    message: status >= 500 ? "Internal server error" : error.message,
  });
});

export default app;
