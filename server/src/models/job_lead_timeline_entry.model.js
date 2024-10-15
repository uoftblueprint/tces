require("dotenv").config();
const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/sequelize");
const Client = require("./client.model");
const User = require("./user.model");
const Employer = require("./employer.model");
const JobLead = require("./job_lead.model");

const JobLeadTimelineEntry = sequelize.define(
  "job_lead_timeline_entries",
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
      type: DataTypes.ENUM("placement", "note"),
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
    client: {
      type: DataTypes.INTEGER,
      references: {
        model: Client,
        key: "id",
      },
      defaultValue: -1,
    },
    job_lead: {
      type: DataTypes.INTEGER,
      references: {
        model: JobLead,
        key: "id",
      },
      defaultValue: -1,
    },
    employer: {
      type: DataTypes.INTEGER,
      references: {
        model: Employer,
        key: "id",
      },
      defaultValue: -1,
    },
    user: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      defaultValue: -1,
    },
  },
  {
    timestamps: false,
    tableName: "job_lead_timeline_entries",
  }
);

module.exports = JobLeadTimelineEntry;
