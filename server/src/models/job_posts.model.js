require("dotenv").config();
const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/sequelize");
const User = require("./user.model");

const JobPosting = sequelize.define(
  "job_postings",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    employer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hours_per_week: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    rate_of_pay_min: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    rate_of_pay_max: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    rate_of_pay_frequency: {
      type: DataTypes.ENUM(
        "hourly",
        "weekly",
        "annually",
        "commission",
        "base & commission",
      ),
      allowNull: false,
    },
    job_type: {
      type: DataTypes.ARRAY(
        DataTypes.ENUM("Part-time", "Full-time", "Contract", "Permanent"),
      ),
      allowNull: false,
    },
    close_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    job_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    custom_questions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    creator: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    state: {
      type: DataTypes.ENUM("Draft", "Active", "Inactive"),
      allowNull: false,
      defaultValue: "Draft",
    },
  },
  {
    sequelize,
    timestamps: true,
    hooks: {
      beforeUpdate: (job) => {
        if (job.state === "Active" && job.close_date < new Date()) {
          job.state = "Inactive";
        }
      },
    },
  },
);

module.exports = JobPosting;
