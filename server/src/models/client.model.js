require("dotenv").config();
const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/sequelize");
const User = require("./user.model");
const JobLead = require("./job_lead.model");

const Client = sequelize.define(
  "clients",
  {
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
    date_added: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    date_updated: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
      type: DataTypes.ENUM(["active", "r_and_i", "closed"]),
      allowNull: true,
    },
    closure_date: {
      // timestamp is a PSQL thing, in mysql it is DATE
      type: DataTypes.DATE,
      allowNull: true,
    },
    status_at_exit: {
      type: DataTypes.ENUM(["employed", "training", "no_results"]),
      allowNull: true,
    },
    status_at_3_months: {
      type: DataTypes.ENUM(["employed", "training", "no_results"]),
      allowNull: true,
    },
    status_at_6_months: {
      type: DataTypes.ENUM(["employed", "training", "no_results"]),
      allowNull: true,
    },
    status_at_9_months: {
      type: DataTypes.ENUM(["employed", "training", "no_results"]),
      allowNull: true,
    },
    status_at_12_months: {
      type: DataTypes.ENUM(["employed", "training", "no_results"]),
      allowNull: true,
    },
    job_lead_placement: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: JobLead,
        key: "id",
      },
      // validate: {
      //   isInJobLead(value) {
      //     if (value !== -1 && !JobLead.findByPk(value)) {
      //       throw new Error("Job lead does not exist");
      //     }
      //   },
      // },
    },
  },
  {
    hooks: {
      async beforeValidate(instance) {
        // Check if employer contact exists
        const jobLeadExists = await JobLead.findByPk(
          instance.job_lead_placement,
        );
        if (!jobLeadExists && instance.job_lead_placement !== -1) {
          throw new Error("Job lead placement does not exist");
        }
      },
    },
  },
);

module.exports = Client;
