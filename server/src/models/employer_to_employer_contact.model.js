require("dotenv").config();
const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/sequelize");
const Employer = require("./employer.model");
const EmployerContact = require("./employer_contact.model");

const EmployerToEmployerContact = sequelize.define(
  "employer_to_employer_contacts",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    employer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Employer,
        key: "id",
      },
      validate: {
        isInEmployer(value) {
          if (!Employer.findByPk(value)) {
            throw new Error("Employer does not exist");
          }
        },
      },
    },
    employer_contact: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: EmployerContact,
        key: "id",
      },
      validate: {
        isInEmployerContact(value) {
          if (!EmployerContact.findByPk(value)) {
            throw new Error("User does not exist");
          }
        },
      },
    },
  },
);

module.exports = EmployerToEmployerContact;
