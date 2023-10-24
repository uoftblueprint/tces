const pinoHTTP = require("pino-http");

module.exports = pinoHTTP({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      ignore: "pid,hostname",
    },
  },
  formatters: {
    level(label) {
      return { level: label.toUpperCase() };
    },
  },
});
