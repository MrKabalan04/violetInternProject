import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Project = sequelize.define(
  "Project",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    longDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    scope: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    sortOrder: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
  },
  { tableName: "projects" }
);

export default Project;
