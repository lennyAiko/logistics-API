const winston = require('winston')
const express = require("express")
require("dotenv").config()

const app = express()

require("./utils/logging")()

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`)
})

module.exports = server