const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Fulfilment = sequelize.define(
  "Fulfilment",
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
    all_products_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    packaging_done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    quality_checked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ready_for_delivery: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "fulfilments",
    timestamps: true,
  }
);

module.exports = Fulfilment;
