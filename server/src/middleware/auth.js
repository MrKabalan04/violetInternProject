import jwt from "jsonwebtoken";
import { AdminUser } from "../models/index.js";
import { ADMIN_COOKIE, JWT_SECRET } from "../config/auth.js";

export async function requireAuth(req, res, next) {
  const token = req.cookies?.[ADMIN_COOKIE];

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await AdminUser.findByPk(payload.sub);

    if (!user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired session" });
  }
}
