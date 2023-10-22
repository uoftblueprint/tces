const pino_http = require('pino-http');

module.exports = pino_http({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            ignore: 'pid,hostname',
        },
    },
    formatters: {
        level(label) {
            return { level: label.toUpperCase() };
        },
    },
});