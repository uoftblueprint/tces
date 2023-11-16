require("dotenv").config();
const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/sequelize");
const User = require("./user.model");
const Employer = require("./employer.model");

const JobLead = sequelize.define("job_leads", {
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
  title: {
    type: DataTypes.STRING,
    allowNull: false,
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
          throw new Error("User does not exist");
        }
      },
    },
  },
  compensation_min: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  compensation_min: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  hours_per_week: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  noc: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  num_of_positions: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  job_description: {
    type: DataTypes.TEXT("medium"),
    allowNull: true,
  },
  employment_type: {
    type: DataTypes.ENUM(["Full Time", "Part Time", "Casual", "On-Call"]),
    allowNull: false,
  },
  expiration_date: {
    types: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = JobLead;
