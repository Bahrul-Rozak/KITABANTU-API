/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName:"category"
  });
  
  Category.associate = function(models) {
    // Relasi ke Project
    Category.hasMany(models.Project, {
      foreignKey: 'category_id',
      as: 'projects'
    });
  };
  
  return Category;
};