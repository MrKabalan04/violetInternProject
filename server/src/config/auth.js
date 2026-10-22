export const ADMIN_COOKIE = "admin_token";

export const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment");
}

export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "8h";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 8 * 60 * 60 * 1000,
};
