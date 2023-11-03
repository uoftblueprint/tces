require("dotenv").config();

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true
      },
    },
    define: {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        timestamps: false,
        freezeTableName: true
    }
  },
);


const User = sequelize.define(process.env.USERS_TABLE, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.BLOB('tiny'),
        allowNull: false
    },
    salt: {
        type: DataTypes.BLOB('tiny'),
        allowNull: false
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    }
});

module.exports = User;