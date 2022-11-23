const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;

const formatSetup = printf(({ level, message, timestamp }) => {
	return `${timestamp} ${level}: ${message}`;
});

module.exports = (dirname) => {
	const levels = {
		error: 0,
		warn: 1,
		info: 2,
		http: 3,
		verbose: 4,
		debug: 5,
	};

	for (let level of Object.keys(levels)) {
		levels[level] = createLogger({
			levels: { [level]: 0 },
			format: combine(timestamp(), formatSetup),
			transports: [
				new transports.Console({
					level,
				}),
			],
		})[level];
	}

	return levels;
};
