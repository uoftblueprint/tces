require("dotenv").config();
const { Sequelize } = require("sequelize");


const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true,
      },
    },
    define: {
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      timestamps: false,
      freezeTableName: true,
    },
  },
);

sequelize.authenticate().catch(() => {
  console.error("Error connecting to database");
});

module.exports = {
  sequelize,
};