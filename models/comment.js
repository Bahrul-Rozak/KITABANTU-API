/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    user_id: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    tableName:"comments"
  });
  
  Comment.associate = function(models) {
    // Relasi ke User
    Comment.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
    
    // Relasi ke Project
    Comment.belongsTo(models.Project, {
      foreignKey: 'project_id',
      as: 'project'
    });
  };
  
  return Comment;
};