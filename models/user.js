/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      // Menggunakan nama tabel 'users'
      tableName: "users",
    }
  );

  User.associate = function (models) {
    // Relasi ke Project
    User.hasMany(models.Project, {
      foreignKey: "user_id",
      as: "projects",
    });

    // Relasi ke Comment
    User.hasMany(models.Comment, {
      foreignKey: "user_id",
      as: "comments",
    });

    // Relasi ke Backer
    User.hasMany(models.Backer, {
      foreignKey: "user_id",
      as: "backers",
    });
  };

  return User;
};
