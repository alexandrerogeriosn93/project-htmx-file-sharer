"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    static associate(models) {
      File.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  File.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      path: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "File",
    }
  );
  return File;
};
