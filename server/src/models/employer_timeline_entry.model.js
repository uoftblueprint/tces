require("dotenv").config();
const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/sequelize");
const User = require("./user.model");
const Client = require("./client.model");
const JobLead = require("./job_lead.model");
const Employer = require("./employer.model");

const EmployerTimelineEntry = sequelize.define(
  "employer_timeline_entries",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    date_added: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    type: {
      type: DataTypes.ENUM("contact", "job_lead_add", "placement", "note"),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    contact: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User, // to be replaced when Contact API is done
        key: "id",
      },
      defaultValue: null,
    },
    employer: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Employer,
        key: "id",
      },
      defaultValue: null,
    },
    client: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Client,
        key: "id",
      },
      defaultValue: null,
    },
    job_lead: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: JobLead,
        key: "id",
      },
      defaultValue: null,
    },
    user: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    hooks: {
      async beforeValidate(instance) {
        // Only check if job_lead is not null
        if (instance.job_lead !== null) {
          const jobLeadExists = await JobLead.findByPk(instance.job_lead);
          if (!jobLeadExists) {
            throw new Error("Job lead does not exist");
          }
        }

        if (instance.user !== null) {
          const userExists = await User.findByPk(instance.user);
          if (!userExists) {
            throw new Error("User does not exist");
          }
        }
      },
    },
    timestamps: false,
    tableName: "employer_timeline_entries",
  }
);

module.exports = EmployerTimelineEntry;
