import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const NavLink = sequelize.define(
  "NavLink",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    label: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    href: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    groupName: {
      type: DataTypes.ENUM("main", "pages"),
      allowNull: false,
      defaultValue: "main",
    },
    showInFooter: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    sortOrder: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
  },
  { tableName: "nav_links" }
);

export default NavLink;
