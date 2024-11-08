require("dotenv").config();
const { Sequelize } = require("sequelize");
// const JobPosting = require("../models/job_posts.model");
// const JobApplication = require("../models/job_applications.model");

// Initialize Sequelize connection
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
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
  },
);

// Authenticate the connection
sequelize.authenticate();

// // Function to reinitialize database
// const reinitializeDatabase = async () => {
//   try {
//     // Disable foreign key checks temporarily
//     await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

//     // Drop all tables
//     await sequelize.drop();

//     // Re-enable foreign key checks
//     await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");

//     // Synchronize all models (force: true will recreate all tables)
//     await sequelize.sync({ force: true });

//     console.log("Database reinitialized successfully");
//   } catch (error) {
//     console.error("Error reinitializing the database:", error);
//   }
// };

// // Call this function to reinitialize the database
// reinitializeDatabase();

module.exports = { sequelize };
