require("dotenv").config();
const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/sequelize");

const EmployerContact = sequelize.define("employer_contacts", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  job_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alt_phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = EmployerContact;