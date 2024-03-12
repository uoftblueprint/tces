require("dotenv").config();
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const Client = require("../../models/client.model");
const Sequelize = require("sequelize");
const { Op } = Sequelize;

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

const createMessage = async (client) => {
  const employer = await User.findByPk(client.owner);
  if (!employer) {
    return null;
  }

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
      Dear ${employer.first_name} ${employer.last_name},
  
      This is a reminder about the client "${client.name}" who was closed on ${closureDate}. It has now been ${monthsSinceClosure} months since their closure. 
  
      -TCES CRM System
    `;

  return message;
};

const sendEmail = (client) => {
  const message = createMessage(client);

  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: client.email,
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

const checkClientClosures = async () => {
  const today = new Date();
  const checkMonths = [3, 6, 9, 12];

  for (const month of checkMonths) {
    const targetDate = new Date();
    targetDate.setMonth(today.getMonth() - month);

    const clients = await Client.findAll({
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

    for (let client of clients) {
      sendEmail(client);
    }
  }
};

cron.schedule("0 0 * * *", () => {
  console.log("Running the client closure check scheduler.");
  checkClientClosures();
});
