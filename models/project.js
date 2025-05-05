/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
"use strict";
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "Project",
    {
      user_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      goal_amount: DataTypes.DECIMAL,
      current_amount: {
        type: DataTypes.DECIMAL,
        defaultValue: 0.0,
      },
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "projects",
    }
  );

  Project.associate = function (models) {
    // Relasi ke User
    Project.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });

    // Relasi ke Category
    Project.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category",
    });

    // Relasi ke Comment
    Project.hasMany(models.Comment, {
      foreignKey: "project_id",
      as: "comments",
    });

    // Relasi ke Backer
    Project.hasMany(models.Backer, {
      foreignKey: "project_id",
      as: "backers",
    });
  };

  return Project;
};
