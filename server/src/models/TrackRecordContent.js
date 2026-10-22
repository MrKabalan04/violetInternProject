import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const TrackRecordContent = sequelize.define(
  "TrackRecordContent",
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
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    linkLabel: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    linkHref: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
  },
  { tableName: "track_record_content" }
);

export default TrackRecordContent;
