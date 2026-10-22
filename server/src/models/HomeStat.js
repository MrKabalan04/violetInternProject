import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const HomeStat = sequelize.define(
  "HomeStat",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    value: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    label: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    sortOrder: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
  },
  { tableName: "home_stats" }
);

export default HomeStat;
