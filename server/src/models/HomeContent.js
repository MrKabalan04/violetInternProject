import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const HomeContent = sequelize.define(
  "HomeContent",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    eyebrow: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    eyebrowIcon: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    titleLine1: {
      type: DataTypes.STRING(190),
      allowNull: false,
      field: "title_line_1",
    },
    titleLine2: {
      type: DataTypes.STRING(190),
      allowNull: false,
      field: "title_line_2",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    backgroundImage: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    primaryButtonLabel: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    primaryButtonHref: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    secondaryButtonLabel: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    secondaryButtonHref: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
  },
  { tableName: "home_content" }
);

export default HomeContent;
