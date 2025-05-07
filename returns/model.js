const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Return = sequelize.define(
  "Return",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "orders",
        key: "id",
      },
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "customers",
        key: "id",
      },
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
      defaultValue: "Pending",
    },
    requested_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "returns",
    timestamps: true,
  }
);

module.exports = Return;
