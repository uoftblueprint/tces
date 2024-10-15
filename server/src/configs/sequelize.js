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
  logging: console.log, // Enable query logging
});

// Authenticate the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to Supabase has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to Supabase:", err);
  });

// Sync the models with the database (this creates the table automatically)
// sequelize
//   .sync()
//   .then(() => {
//     console.log("Tables have been created");
//   })
//   .catch((error) => {
//     console.error("Error creating tables:", error);
//   });

module.exports = {
  sequelize,
};
