const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Courier = sequelize.define(
  "Courier",
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
    vehicle_type: {
      type: DataTypes.STRING, // e.g., bike, van, truck
    },
    vehicle_number: {
      type: DataTypes.STRING, // license plate
    },
    status: {
      type: DataTypes.STRING, // e.g., active, inactive
    },
    location: {
      type: DataTypes.STRING,
    },
    joining_date: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    tableName: "couriers",
    timestamps: true,
  }
);

module.exports = Courier;
