const winston = require("winston")
const mongoose = require("mongoose")
require("dotenv").config()

module.exports = function () {
    mongoose.set("strictQuery", true)

    const dbConn = process.env.MONGO_URI
    mongoose.connect(dbConn).then(() => {
        winston.info("Connected to DB...")
    })

}