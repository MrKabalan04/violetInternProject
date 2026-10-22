import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const AboutContent = sequelize.define(
  "AboutContent",
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
    heading: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    badgeValue: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    badgeLabel: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    imagePrimary: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    imageSecondary: {
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
  { tableName: "about_content" }
);

export default AboutContent;
