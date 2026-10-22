import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ServicesContent = sequelize.define(
  "ServicesContent",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    subtitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    mediaImage: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    mediaHeading: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    mediaLinkLabel: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    mediaLinkHref: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
  },
  { tableName: "services_content" }
);

export default ServicesContent;
