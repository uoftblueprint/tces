require("dotenv").config();
const { DataTypes } = require("sequelize");
const { sequelize } = require('../configs/sequelize');


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