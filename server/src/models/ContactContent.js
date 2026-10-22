import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ContactContent = sequelize.define(
  "ContactContent",
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
    lead: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cardTitle: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    cardDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { tableName: "contact_content" }
);

export default ContactContent;
