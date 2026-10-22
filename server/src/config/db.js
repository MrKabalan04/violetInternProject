import { Sequelize } from "sequelize";

const requiredKeys = ["DB_NAME", "DB_USER", "DB_PASSWORD"];

for (const key of requiredKeys) {
  if (!process.env[key]) {
    throw new Error(`${key} is not defined in the environment`);
  }
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",
    logging: process.env.DB_LOGGING === "true" ? console.log : false,
    define: {
      underscored: true,
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export async function connectDB() {
  await sequelize.authenticate();
  console.log(
    `MySQL connected: ${sequelize.config.host}:${sequelize.config.port}/${sequelize.config.database}`
  );
}

export async function closeDB() {
  await sequelize.close();
}

export default sequelize;
