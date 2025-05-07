const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Vendor = sequelize.define(
  "Vendor",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    business_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

  },
  {
    timestamps: true,
    tableName: "vendors",
  }
);

// const Order = require("../orders/model");
// Vendor.hasMany(Order, { foreignKey: "vendor_id", as: "orders" });

module.exports = Vendor;
