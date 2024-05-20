require("dotenv").config();
const logger = require("pino")();
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const Client = require("../../models/client.model");
const User = require("../../models/user.model");
const Sequelize = require("sequelize");
const { Op } = Sequelize;

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

const createMessage = (client, tces_employee) => {
  const closureDate = new Date(client.closure_date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  const today = new Date();
  const closureDate2 = new Date(client.closure_date);
  const monthsSinceClosure =
    today.getMonth() -
    closureDate2.getMonth() +
    12 * (today.getFullYear() - closureDate2.getFullYear());

  const message = `
      Dear ${tces_employee.first_name} ${tces_employee.last_name},
  
      This is a reminder about the client "${client.name}" who was closed on ${closureDate}. It has now been ${monthsSinceClosure} months since their closure. 
  
      -TCES CRM System
    `;

  return message;
};

const sendEmail = async (client) => {
  const tces_employee = await User.findByPk(client.owner);
  const message = createMessage(client, tces_employee);

  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: tces_employee.email,
    subject: "TCES CRM Client Status - Needs Attention",
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const checkClientClosureForMonth = async (checkMonths) => {
  const today = new Date();
  const targetDate = new Date();
  const clients = [];

  for (const month of checkMonths) {
    targetDate.setMonth(today.getMonth() - month);
    const clientsForMonth = await Client.findAll({
      where: {
        status: "closed",
        closure_date: {
          [Op.gte]: new Date(
            targetDate.getFullYear(),
            targetDate.getMonth(),
            targetDate.getDate(),
            0,
            0,
            0,
          ),
          [Op.lt]: new Date(
            targetDate.getFullYear(),
            targetDate.getMonth(),
            targetDate.getDate() + 1,
            0,
            0,
            0,
          ),
        },
      },
    });

    clients.push(...clientsForMonth);
  }

  // This should consist of unique client objects
  return clients;
};

// const getClosedClients = async () => {
//   const clients = await Client.findAll({
//     where: {
//       status: "closed",
//     },
//   });
//   return clients
// }

const checkClientClosures = async () => {
  const checkMonths = [3, 6, 9, 12];

  // const clients = await getClosedClients(checkMonths);
  const clients = await checkClientClosureForMonth(checkMonths);
  console.log(`Found ${clients.length} clients to send emails to.`);

  for (let client of clients) {
    try {
      // Client's owner is extracted and an email is sent to them.
      await sendEmail(client);
    } catch (error) {
      console.log(`Could not notify ${client.name}'s owner.`);
    }
  }
};

const beginScheduler = () => {
  cron.schedule(
    "0 0 * * *",
    () => {
      console.log("Running the client closure check scheduler.");
      checkClientClosures();
    },
    {
      recoverMissedExecutions: true,
    },
  );
};
module.exports = {
  checkClientClosures,
  checkClientClosureForMonth,
  sendEmail,
  beginScheduler,
};
