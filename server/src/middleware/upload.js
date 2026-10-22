import { randomUUID } from "node:crypto";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import multer from "multer";

export const uploadsDir = fileURLToPath(new URL("../../uploads", import.meta.url));

mkdirSync(uploadsDir, { recursive: true });

const allowedExtensions = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".gif",
]);

const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
]);

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadsDir);
  },
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    callback(null, `${Date.now()}-${randomUUID()}${extension}`);
  },
});

function fileFilter(req, file, callback) {
  const extension = path.extname(file.originalname).toLowerCase();

  if (!allowedMimeTypes.has(file.mimetype) || !allowedExtensions.has(extension)) {
    const error = new Error(
      "Unsupported file type. Use JPG, PNG, WebP, AVIF, or GIF."
    );
    error.statusCode = 400;
    return callback(error);
  }

  callback(null, true);
}

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
});
