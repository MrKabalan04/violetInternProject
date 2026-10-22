import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ContactDetail = sequelize.define(
  "ContactDetail",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    icon: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    label: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    href: {
      type: DataTypes.STRING(190),
      allowNull: true,
    },
    sortOrder: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
  },
  { tableName: "contact_details" }
);

export default ContactDetail;
