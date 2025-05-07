const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

require("../orders/model");
require("../vendor/model");

const Settlement = sequelize.define(
  "Settlement",
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
    vendor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "vendors",
        key: "id",
      },
    },
    amount_due: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    platform_fee: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.ENUM(
        "cash_on_delivery",
        "mobile_money",
        "card",
        "bank_transfer"
      ),
      allowNull: false,
    },

    payment_status: {
      type: DataTypes.ENUM("pending", "paid"),
      defaultValue: "pending",
    },
    settlement_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "settlements",
    timestamps: true,
  }
);

module.exports = Settlement;
