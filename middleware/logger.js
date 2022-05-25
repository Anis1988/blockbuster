
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, prettyPrint } = format;



const loggerDB = createLogger({
  level: "info",
  format: combine(
    label({ label: "DB-CONNECTION" }),
    timestamp({ format: "YYYY/MM/dd => HH:mm" }),
    prettyPrint()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "database.log" }),
  ],
});
const loggerErrors = createLogger({
  level: "error",
  format: combine(
    label({ label: "CODE-ERROR" }),
    timestamp({ format: "YYYY/MM/dd => HH:mm" }),
    prettyPrint()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "error.log" }),
  ],
  exitOnError: false,

});
const loggerUncaught = createLogger({
  level: "error",
  format: combine(
    label({ label: "UNCAUGHT-ERRORS" }),
    timestamp({ format: "YYYY/MM/dd => HH:mm" }),
    prettyPrint()
  ),
  exceptionHandlers: [
    new transports.File({ filename: "uncaughtError.log" }),
    new transports.Console(),
  ],
  exitOnError: false,

});




exports.loggerDB = loggerDB
exports.loggerErrors = loggerErrors




