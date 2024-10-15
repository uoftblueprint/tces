require("dotenv").config();
const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/sequelize");
const User = require("./user.model");
const Employer = require("./employer.model");

const JobLead = sequelize.define(
  "job_leads",
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
      // validate: {
      //   isInUser(value) {
      //     if (!User.findByPk(value)) {
      //       throw new Error("User does not exist");
      //     }
      //   },
      // },
    },
    creator: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      // validate: {
      //   isInUser(value) {
      //     if (!User.findByPk(value)) {
      //       throw new Error("User does not exist");
      //     }
      //   },
      // },
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
    job_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    num_of_positions: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    compensation_max: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    compensation_min: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    hours_per_week: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    national_occupation_code: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    job_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    creation_date: {
      // timestamp is a PSQL thing, in mysql it is DATE
      type: DataTypes.DATE,
      allowNull: true,
    },
    expiration_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    employment_type: {
      type: DataTypes.ENUM(["Full Time", "Part Time", "Casual", "On-Call"]),
      allowNull: true,
    },
  },
  {
    hooks: {
      async beforeValidate(instance) {
        // Check if owner exists
        const ownerExists = await User.findByPk(instance.owner);
        if (!ownerExists) {
          throw new Error("User in owner attribute does not exist");
        }

        // check if creator exists
        const creatorExists = await User.findByPk(instance.creator);
        if (!creatorExists) {
          throw new Error("User in creator attribute does not exist");
        }

        // Check if employer contact exists
        const employerExists = await Employer.findByPk(instance.employer);
        if (!employerExists) {
          throw new Error("Employer does not exist");
        }
      },
    },
  }
);

module.exports = JobLead;
