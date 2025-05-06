/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
"use strict";
module.exports = (sequelize, DataTypes) => {
  const Backer = sequelize.define(
    "Backer",
    {
      user_id: DataTypes.INTEGER,
      project_id: DataTypes.INTEGER,
      amount: DataTypes.DECIMAL,
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
      tableName:"backers"
    }
  );

  Backer.associate = function (models) {
    // Relasi ke User
    Backer.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });

    // Relasi ke Project
    Backer.belongsTo(models.Project, {
      foreignKey: "project_id",
      as: "project",
    });

    // Relasi ke Payment
    Backer.hasOne(models.Payment, {
      foreignKey: "backer_id",
      as: "payment",
    });
  };

  return Backer;
};
