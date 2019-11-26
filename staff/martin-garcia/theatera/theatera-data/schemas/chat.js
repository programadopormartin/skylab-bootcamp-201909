const { Schema, ObjectId } = require('mongoose')
const { models: { Message } } = require('../index')

module.exports = new Schema({
    users: {
        type: [ObjectId],
        require: true,
        ref: 'User'
    },
    messages: {
        type: [Message],
        required: true
    }
})