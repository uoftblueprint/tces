require("dotenv").config();
const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/sequelize");
const User = require("./user.model");

const Client = sequelize.define("clients", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  owner: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
    validate: {
      isInUser(value) {
        if (!User.findByPk(value)) {
          throw new Error("User does not exist");
        }
      },
    },
  },
  creator: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
    validate: {
      isInUser(value) {
        if (!User.findByPk(value)) {
          throw new Error("User does not exist");
        }
      },
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  closure_date: {
    // timestamp is a PSQL thing, in mysql it is DATE
    type: DataTypes.DATE,
    allowNull: true,
  },
  status_at_exit: {
    type: DataTypes.ENUM([
      "active",
      "closed_to_employed",
      "closed_to_training",
      "closed_to_no_results",
    ]),
    allowNull: true,
  },
  status_at_3_months: {
    type: DataTypes.ENUM([
      "active",
      "closed_to_employed",
      "closed_to_training",
      "closed_to_no_results",
    ]),
    allowNull: true,
  },
  status_at_6_months: {
    type: DataTypes.ENUM([
      "active",
      "closed_to_employed",
      "closed_to_training",
      "closed_to_no_results",
    ]),
    allowNull: true,
  },
  status_at_12_months: {
    type: DataTypes.ENUM([
      "active",
      "closed_to_employed",
      "closed_to_training",
      "closed_to_no_results",
    ]),
    allowNull: true,
  },
});

module.exports = Client;
