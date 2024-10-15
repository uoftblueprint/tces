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
      // validate: {
      //   isInEmployer(value) {
      //     if (!Employer.findByPk(value)) {
      //       throw new Error("Employer does not exist");
      //     }
      //   },
      // },
    },
    employer_contact: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: EmployerContact,
        key: "id",
      },
      // validate: {
      //   isInEmployerContact(value) {
      //     if (!EmployerContact.findByPk(value)) {
      //       throw new Error("User does not exist");
      //     }
      //   },
      // },
    },
  },
  {
    hooks: {
      async beforeValidate(instance) {
        // Check if employer contact exists
        const employerExists = await Employer.findByPk(instance.employer);
        if (!employerExists) {
          throw new Error("Employer does not exist");
        }

        const employerContactExists = await EmployerContact.findByPk(
          instance.employer_contact
        );
        if (!employerContactExists) {
          throw new Error("Employer contact does not exist");
        }
      },
    },
  }
);

module.exports = EmployerToEmployerContact;
