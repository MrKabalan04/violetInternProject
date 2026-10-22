import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const AdminUser = sequelize.define(
  "AdminUser",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(190),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "editor"),
      allowNull: false,
      defaultValue: "admin",
    },
  },
  { tableName: "admin_users" }
);

export default AdminUser;
