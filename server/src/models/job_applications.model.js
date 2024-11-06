const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/sequelize");
const JobPosting = require("./job_posts.model");

const JobApplication = sequelize.define(
  "job_applications",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    job_posting_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: JobPosting,
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^\d{10}$/,
      },
    },
    postal_code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
      },
    },
    resume: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status_in_canada: {
      type: DataTypes.ENUM(
        "Citizen",
        "PR",
        "Conventional Refugee",
        "Student Visa",
        "Open Work",
        "Other",
      ),
      allowNull: false,
    },
    status_other: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    application_status: {
      type: DataTypes.ENUM(
        "Contacted",
        "Rejected",
        "R & I",
        "Approved",
        "In Progress",
        "New",
      ),
      allowNull: false,
      defaultValue: "New",
    },
    custom_responses: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    applied_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    timestamps: true, // Automatically adds createdAt and updatedAt
  },
);

module.exports = JobApplication;
