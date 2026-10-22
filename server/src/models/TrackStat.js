import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const TrackStat = sequelize.define(
  "TrackStat",
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
  { tableName: "track_stats" }
);

export default TrackStat;
