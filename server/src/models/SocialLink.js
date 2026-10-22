import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const SocialLink = sequelize.define(
  "SocialLink",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    platform: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    sortOrder: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
  },
  { tableName: "social_links" }
);

export default SocialLink;
