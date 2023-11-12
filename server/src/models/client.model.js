require("dotenv").config();
const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/sequelize");

const Client = sequelize.define("clients", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  owner: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: process.env.USERS_TABLE,
  },
  creator: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: process.env.USERS_TABLE,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  closure_date: {
    // timestamp is a PSQL thing, in mysql it is DATE
    type: DataTypes.DATE,
    allowNull: false,
  },
  status_at_exit: {
    type: DataTypes.ENUM(['active', 'closed_to_employed', 'closed_to_training', 'closed_to_no_results']),
    allowNull: false,
  },
  status_at_3_months : {
    type: DataTypes.ENUM(['active', 'closed_to_employed', 'closed_to_training', 'closed_to_no_results']),
    allowNull: false,
  },
  status_at_6_months : {
    type: DataTypes.ENUM(['active', 'closed_to_employed', 'closed_to_training', 'closed_to_no_results']),
    allowNull: false,
  },
  status_at_12_months : {
    type: DataTypes.ENUM(['active', 'closed_to_employed', 'closed_to_training', 'closed_to_no_results']),
    allowNull: false,
  },
});

module.exports = Client;
