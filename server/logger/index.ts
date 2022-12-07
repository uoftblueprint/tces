const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, prettyPrint } = format;

const formatSetup = printf(({ level, message, timestamp }) => {
	return `${timestamp} ${message} ${level}`;
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
			format: combine(timestamp(), formatSetup, prettyPrint()),
			transports: [
				new transports.Console({
					level,
				}),
			],
		})[level];
	}

	return levels;
};
