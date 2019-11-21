const { Schema } = require('mongoose')
const { validators: { isEmail } } = require('tasks-util')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        validate: isEmail
    },
    password: {
        type: String,
        required: true
    },
    lastAccess: {
        type: Date,
        required: false
    }
})