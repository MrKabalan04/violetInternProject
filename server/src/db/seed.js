import "dotenv/config";
import sequelize, { connectDB } from "../config/db.js";
import { createSeeder } from "./umzug.js";

const shouldUndo = process.argv.includes("--down");

async function run() {
  try {
    await connectDB();
    const seeder = await createSeeder();
    const result = shouldUndo ? await seeder.down() : await seeder.up();
    const action = shouldUndo ? "Reverted" : "Applied";
    if (result.length === 0) {
      console.log(`No seeders to ${shouldUndo ? "revert" : "apply"}`);
    } else {
      console.log(`${action} ${result.length} seeder(s)`);
    }
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

run();
