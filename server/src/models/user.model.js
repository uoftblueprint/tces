const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  'blueprint-tces',
  '8p17fcl2jfs56m6568qv',
  'pscale_pw_I0KA2cGUmh9IeR95xDnRy9YAjZlkLQGzJVn1JXbJWve',
  {
    host: 'aws.connect.psdb.cloud',
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
        timestamps: false 
    }
  },
);


const User = sequelize.define("users-dev", {
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
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    }
});

module.exports = User;