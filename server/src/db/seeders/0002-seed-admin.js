import bcrypt from "bcryptjs";
import { AdminUser } from "../../models/index.js";

function adminCredentials() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME?.trim() || "Administrator";

  if (!email || !password) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD must be set before seeding the admin user"
    );
  }

  return { email, password, name };
}

export async function up() {
  const { email, password, name } = adminCredentials();
  const passwordHash = await bcrypt.hash(password, 12);

  const [user, created] = await AdminUser.findOrCreate({
    where: { email },
    defaults: {
      name,
      passwordHash,
      role: "admin",
    },
  });

  if (!created) {
    await user.update({ name, passwordHash, role: "admin" });
  }
}

export async function down() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();

  if (email) {
    await AdminUser.destroy({ where: { email } });
  }
}
