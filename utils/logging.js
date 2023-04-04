const winston = require("winston")
require("express-async-errors")

module.exports = function () {
    winston.exceptions.handle(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),
        new winston.transports.File({
            filename: "exceptions.log",
            format: winston.format.json()
        })
    )

    process.on("unhandledRejection", (ex) => {
        throw ex
    })

    winston.add(
        new winston.transports.File({
            filename: "logger.log",
            format: winston.format.json()
        })
    )
}