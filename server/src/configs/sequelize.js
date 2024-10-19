require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.SUPABASE_DATABASE_URI, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  define: {
    defaultScope: {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
    timestamps: false,
    freezeTableName: true,
  },
});

// Authenticate the connection
sequelize.authenticate().then(() => {
  // return sequelize.sync({ force: true }); // Use { force: true } if you want to recreate the tables
});

module.exports = {
  sequelize,
};
