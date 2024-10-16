require("dotenv").config();
const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/sequelize");
const Employer = require("./employer.model");

const EmployerContact = sequelize.define(
  "employer_contacts",
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alt_phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
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
  },
  {
    hooks: {
      async beforeValidate(instance) {
        // Check if employer contact exists
        const employerExists = await Employer.findByPk(instance.employer);
        if (!employerExists) {
          throw new Error("Employer does not exist");
        }
      },
    },
  },
);

module.exports = EmployerContact;
