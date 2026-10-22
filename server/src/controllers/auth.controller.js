import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AdminUser } from "../models/index.js";
import {
  ADMIN_COOKIE,
  COOKIE_OPTIONS,
  JWT_EXPIRES_IN,
  JWT_SECRET,
} from "../config/auth.js";
import {
  changePasswordSchema,
  loginSchema,
} from "../validation/schemas.js";

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export async function login(req, res, next) {
  try {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    const email = parsed.data.email.toLowerCase();
    const user = await AdminUser.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatches = await bcrypt.compare(
      parsed.data.password,
      user.passwordHash
    );

    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { sub: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.cookie(ADMIN_COOKIE, token, COOKIE_OPTIONS);
    res.json({ user: publicUser(user) });
  } catch (error) {
    next(error);
  }
}

export function logout(req, res) {
  const { maxAge, ...cookieOptions } = COOKIE_OPTIONS;
  res.clearCookie(ADMIN_COOKIE, cookieOptions);
  res.status(204).send();
}

export function me(req, res) {
  res.json({ user: publicUser(req.user) });
}

export async function changePassword(req, res, next) {
  try {
    const parsed = changePasswordSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    const user = await AdminUser.findByPk(req.user.id);

    if (!user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const passwordMatches = await bcrypt.compare(
      parsed.data.currentPassword,
      user.passwordHash
    );

    if (!passwordMatches) {
      return res
        .status(400)
        .json({ message: "Current password is incorrect" });
    }

    const passwordHash = await bcrypt.hash(parsed.data.newPassword, 12);
    await user.update({ passwordHash });

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
}
