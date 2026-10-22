import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ProjectsContent = sequelize.define(
  "ProjectsContent",
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
  },
  { tableName: "projects_content" }
);

export default ProjectsContent;
