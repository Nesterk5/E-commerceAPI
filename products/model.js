const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vendor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "vendors",
        key: "id",
      },
    },
    category: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "products",
    timestamps: true,
  }
);

module.exports = Product;
