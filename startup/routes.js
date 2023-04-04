const express = require("express")
const error = require("../middlewares/error")

const auth = require("../routes/auth")

module.exports = function (app) {
    app.use(express.json()),
    app.use("/api/auth", auth)
    app.use(error)
}