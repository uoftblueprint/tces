require("dotenv").config();
const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/sequelize");
const User = require("./user.model");
const JobLead = require("./job_lead.model");
const Client = require("./client.model");

const ClientTimelineEntry = sequelize.define(
  "clients",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    date_added: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("update", "contact", "placement", "note"),
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
      allowNull: true,
      references: {
        model: Client,
        key: "id",
      },
      defaultValue: -1,
    },
    job_lead: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: JobLead,
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
    tableName: "clients",
  },
);

module.exports = ClientTimelineEntry;
