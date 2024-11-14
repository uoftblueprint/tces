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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    employer: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hours_per_week: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
      },
    },
    rate_of_pay_min: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    rate_of_pay_max: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    rate_of_pay_frequency: {
      type: DataTypes.ENUM(
        "Hourly",
        "Weekly",
        "Annually",
        "Commission",
        "Base and Commission"
      ),
      allowNull: true,
    },
    job_type: {
      type: DataTypes.JSON, // Using JSON to store multiple job types
      allowNull: true,
      validate: {
        isValidJobType(value) {
          const allowedTypes = [
            "Contract",
            "Freelance",
            "Full-time",
            "Internship",
            "Part-time",
            "Permanent",
            "Seasonal",
          ];
          if (!Array.isArray(value)) {
            throw new Error("Job type must be an array");
          }
          value.forEach((type) => {
            if (!allowedTypes.includes(type)) {
              throw new Error(`Invalid job type: ${type}`);
            }
          });
        },
      },
    },
    close_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    job_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    custom_questions: {
      type: DataTypes.JSON,
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
        if (
          job.state === "Active" &&
          job.close_date &&
          job.close_date < new Date()
        ) {
          job.setDataValue("state", "Inactive");
        }
      },
    },
  }
);

module.exports = JobPosting;
