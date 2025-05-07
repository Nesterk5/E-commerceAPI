const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Customer = sequelize.define(
  "Customer",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "customers",
    timestamps: true,
  }
);

// const Order = require("../orders/model");
// Customer.hasMany(Order, { foreignKey: "customer_id", as: "orders" });

module.exports = Customer;
