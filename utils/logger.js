import { createLogger, format, transports } from "winston";
const { combine, timestamp, json, colorize } = format;

const loggerFormat = format.combine(
  format.colorize(),
  format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level}]: ${message}`;
  })
);
const logger = createLogger({
  level: "info",
  format: combine(colorize(), timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), json()),

  transports: [
    new transports.Console({
      format: loggerFormat,
    }),
    new transports.File({ filename: "logs/app.log", format: json() }),
  ],
});

export default logger;
