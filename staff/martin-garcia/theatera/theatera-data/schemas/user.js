const { Schema, ObjectId } = require('mongoose')
const { validators: { isEmail } } = require('../utils/is-email')
const { models: { Chat, Post } } = require('../index')


module.exports = new Schema({
    name: {
        type: String,
        required: true
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
    image: {
        data: Buffer,
        contentType: String,
        required: false
    },
    lastaccess: {
        type: Date,
        required: false
    },
    phone: {
        type: string,
        required: false
    },
    address: {
        type: string,
        required: false
    },
    city: {
        type: string,
        required: false
    },
    website: {
        type: string,
        required: false
    },
    introduction: {
        type: string,
        required: false
    },
    description: {
        type: string,
        required: false
    },
    skills: {
        type: [string],
        require: false
    },
    experiences: {
        type: string,
        required: false
    },
    rol: {
        type: string,
        required: true,
        enum: ['PERSON', 'COMPANY']
    },
    specificInfo: {
        type: Object,
        required: true
    },
    chats: {
        type: [Chat],
        require: false
    },
    posts: {
        type: [Post],
        required: false
    }
})