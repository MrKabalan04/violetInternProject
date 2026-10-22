import "dotenv/config";
import sequelize, { connectDB } from "../config/db.js";
import { createMigrator } from "./umzug.js";

const shouldUndo = process.argv.includes("--down");

async function run() {
  try {
    await connectDB();
    const migrator = await createMigrator();
    const result = shouldUndo ? await migrator.down() : await migrator.up();
    const action = shouldUndo ? "Reverted" : "Applied";
    if (result.length === 0) {
      console.log(`No migrations to ${shouldUndo ? "revert" : "apply"}`);
    } else {
      console.log(`${action} ${result.length} migration(s)`);
    }
  } catch (error) {
    console.error("Migration failed:", error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

run();
