const winston = require('winston')
const express = require("express")

const app = express()

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

module.exports = server