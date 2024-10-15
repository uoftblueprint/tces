require("dotenv").config();
const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/sequelize");
const User = require("./user.model");

const Employer = sequelize.define(
  "employers",
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
    date_added: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    legal_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fax: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    naics_code: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    province: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    postal_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    secondary_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    secondary_city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    secondary_province: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    secondary_postal_code: {
      type: DataTypes.STRING,
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
      },
    },
  }
);

module.exports = Employer;
