import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { Umzug, SequelizeStorage } from "umzug";
import sequelize from "../config/db.js";

const currentDir = path.dirname(fileURLToPath(import.meta.url));

async function loadSteps(folder) {
  const directory = path.join(currentDir, folder);
  const files = (await readdir(directory))
    .filter((file) => file.endsWith(".js"))
    .sort();

  return Promise.all(
    files.map(async (file) => {
      const module = await import(pathToFileURL(path.join(directory, file)).href);
      return {
        name: file.replace(/\.js$/, ""),
        up: module.up,
        down: module.down,
      };
    })
  );
}

export async function createMigrator() {
  return new Umzug({
    migrations: await loadSteps("migrations"),
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({
      sequelize,
      tableName: "sequelize_migrations",
    }),
    logger: console,
  });
}

export async function createSeeder() {
  return new Umzug({
    migrations: await loadSteps("seeders"),
    context: { sequelize },
    storage: new SequelizeStorage({
      sequelize,
      tableName: "sequelize_seeders",
    }),
    logger: console,
  });
}
