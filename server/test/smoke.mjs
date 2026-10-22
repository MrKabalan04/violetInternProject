import assert from "node:assert/strict";
import { readFile, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import bcrypt from "bcryptjs";
import app from "../src/app.js";
import sequelize from "../src/config/db.js";
import { AdminUser } from "../src/models/index.js";

const uploadsDir = fileURLToPath(new URL("../uploads/", import.meta.url));
const adminEmail = `smoke-${Date.now()}@example.test`;
const adminPassword = "SmokeTest123!";

let testAdmin = null;
let uploadedFile = null;
const server = app.listen(0);

await new Promise((resolve) => server.once("listening", resolve));

const baseUrl = `http://127.0.0.1:${server.address().port}`;

async function requestJson(url, options = {}) {
  const response = await fetch(`${baseUrl}${url}`, options);
  const body = await response.json().catch(() => null);
  return { response, body };
}

function jsonOptions(cookie, method, body) {
  return {
    method,
    headers: { cookie, "content-type": "application/json" },
    body: JSON.stringify(body),
  };
}

try {
  testAdmin = await AdminUser.create({
    name: "Smoke Test Admin",
    email: adminEmail,
    passwordHash: await bcrypt.hash(adminPassword, 12),
    role: "admin",
  });

  const health = await requestJson("/api/health");
  assert.equal(health.response.status, 200);
  assert.equal(health.body.database, "connected");

  const publicContent = await requestJson("/api/content");
  assert.equal(publicContent.response.status, 200);
  assert.ok(publicContent.body.projects.items.length > 0);
  assert.ok(publicContent.body.services.items.length > 0);
  assert.ok(publicContent.body.navLinks.main.length > 0);

  const unauthorized = await requestJson("/api/admin/content");
  assert.equal(unauthorized.response.status, 401);

  const badLogin = await requestJson("/api/auth/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: adminEmail, password: "wrong-password" }),
  });
  assert.equal(badLogin.response.status, 401);

  const login = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: adminEmail, password: adminPassword }),
  });
  assert.equal(login.status, 200);

  const setCookie = login.headers.getSetCookie()[0];
  assert.ok(setCookie?.startsWith("admin_token="));

  const cookie = setCookie.split(";")[0];

  const me = await requestJson("/api/auth/me", { headers: { cookie } });
  assert.equal(me.response.status, 200);
  assert.equal(me.body.user.email, adminEmail.toLowerCase());

  const adminContent = await requestJson("/api/admin/content", {
    headers: { cookie },
  });
  assert.equal(adminContent.response.status, 200);

  const siteUpdate = await requestJson(
    "/api/admin/content/site",
    jsonOptions(cookie, "PUT", {
      brandMark: adminContent.body.site.brandMark,
    })
  );
  assert.equal(siteUpdate.response.status, 200);

  const invalidUpdate = await requestJson(
    "/api/admin/content/site",
    jsonOptions(cookie, "PUT", { brandMark: "" })
  );
  assert.equal(invalidUpdate.response.status, 400);

  const wrongCurrentPassword = await requestJson(
    "/api/auth/password",
    jsonOptions(cookie, "PUT", {
      currentPassword: "wrong-password",
      newPassword: adminPassword,
    })
  );
  assert.equal(wrongCurrentPassword.response.status, 400);

  const shortNewPassword = await requestJson(
    "/api/auth/password",
    jsonOptions(cookie, "PUT", {
      currentPassword: adminPassword,
      newPassword: "123",
    })
  );
  assert.equal(shortNewPassword.response.status, 400);

  const updatedPassword = await requestJson(
    "/api/auth/password",
    jsonOptions(cookie, "PUT", {
      currentPassword: adminPassword,
      newPassword: adminPassword,
    })
  );
  assert.equal(updatedPassword.response.status, 200);

  const relogin = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: adminEmail, password: adminPassword }),
  });
  assert.equal(relogin.status, 200);

  const resources = [
    "home-stats",
    "about-features",
    "services",
    "track-stats",
    "projects",
    "contact-details",
    "social-links",
    "nav-links",
  ];

  for (const resource of resources) {
    const list = await requestJson(`/api/admin/${resource}`, {
      headers: { cookie },
    });
    assert.equal(list.response.status, 200);
    assert.ok(Array.isArray(list.body));
  }

  const created = await requestJson(
    "/api/admin/social-links",
    jsonOptions(cookie, "POST", {
      platform: "Smoke Test",
      icon: "bi-check-circle",
      url: "https://example.com/smoke-test",
      sortOrder: 999,
    })
  );
  assert.equal(created.response.status, 201);

  const updated = await requestJson(
    `/api/admin/social-links/${created.body.id}`,
    jsonOptions(cookie, "PUT", { platform: "Smoke Test Updated" })
  );
  assert.equal(updated.response.status, 200);
  assert.equal(updated.body.platform, "Smoke Test Updated");

  const removed = await fetch(
    `${baseUrl}/api/admin/social-links/${created.body.id}`,
    { method: "DELETE", headers: { cookie } }
  );
  assert.equal(removed.status, 204);

  const imageBuffer = await readFile(
    path.join(uploadsDir, "seed", "homeImg.avif")
  );
  const form = new FormData();
  form.append(
    "image",
    new Blob([imageBuffer], { type: "image/avif" }),
    "smoke-test.avif"
  );

  const upload = await requestJson("/api/admin/uploads", {
    method: "POST",
    headers: { cookie },
    body: form,
  });
  assert.equal(upload.response.status, 201);
  assert.ok(upload.body.url?.startsWith("/uploads/"));

  uploadedFile = path.join(uploadsDir, path.basename(upload.body.url));
  const uploadedImage = await fetch(`${baseUrl}${upload.body.url}`);
  assert.equal(uploadedImage.status, 200);

  const logout = await fetch(`${baseUrl}/api/auth/logout`, {
    method: "POST",
    headers: { cookie },
  });
  assert.equal(logout.status, 204);

  const afterLogout = await fetch(`${baseUrl}/api/admin/content`);
  assert.equal(afterLogout.status, 401);

  console.log("API smoke test passed");
} finally {
  if (uploadedFile) {
    await unlink(uploadedFile).catch(() => {});
  }
  if (testAdmin) {
    await testAdmin.destroy().catch(() => {});
  }
  await new Promise((resolve) => server.close(resolve));
  await sequelize.close();
}
