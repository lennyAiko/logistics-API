const jwt = require("jsonwebtoken")
const Joi = require("joi")
const mongoose = require("mongoose")

require("dotenv").config()

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        unique: true
    },
    first_name: {
        type: String,
        minlength: 3,
        maxlength: 255
    },
    last_name: {
        type: String,
        minlength: 3,
        maxlength: 255
    },
    phone: {
        type: String,
        minlength: 11,
        maxlength: 11
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }

})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        {
            _id: this.id,
            username: this.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "30d",
        }
    )
    return token
}

const User = mongoose.model("User", userSchema)

function validateUser(user) {
    const schema = {
        username: Joi.string().min(3).max(255).required(),
        email: Joi.string().min(3).max(255).required().email(),
        first_name: Joi.string().min(3).max(255),
        last_name: Joi.string().min(3).max(255),
        phone: Joi.string().min(11).max(11),
        password: Joi.string().min(5).max(1024).required(),
    }

    return Joi.validate(user, schema)
}

exports.User = User
exports.validate = validateUser