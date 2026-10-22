import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const SiteSetting = sequelize.define(
  "SiteSetting",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    brandName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    brandMark: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    phoneHref: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    workingHours: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    footerDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    copyrightText: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
  },
  { tableName: "site_settings" }
);

export default SiteSetting;
