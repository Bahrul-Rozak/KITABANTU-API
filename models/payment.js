/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
"use strict";
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
    {
      backer_id: DataTypes.INTEGER,
      status: DataTypes.STRING,
      payment_method: DataTypes.STRING,
      payment_date: DataTypes.DATE,
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
    }
  );

  Payment.associate = function (models) {
    // Relasi ke Backer
    Payment.belongsTo(models.Backer, {
      foreignKey: "backer_id",
      as: "backer",
    });
  };

  return Payment;
};
