require("dotenv").config();
const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/sequelize");
const Employer = require("./employer.model");
const JobLead = require("./job_lead.model");

const EmployerToJobLead = sequelize.define("employer_to_employer_contacts", {
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
  job_lead: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: JobLead,
      key: "id",
    },
    validate: {
      isInJobLead(value) {
        if (!JobLead.findByPk(value)) {
          throw new Error("User does not exist");
        }
      },
    },
  },
});

module.exports = EmployerToJobLead;
