const { Schema, ObjectId } = require('mongoose')
    /* const { validators: { isEmail } } = require('../utils/is-email')
     */
const Chat = require('./chat')
const Post = require('./post')


module.exports = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        /*         validate: isEmail
         */
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
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    website: {
        type: String,
        required: false
    },
    introduction: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    skills: {
        type: [String],
        require: false
    },
    experiences: {
        type: String,
        required: false
    },
    rol: {
        type: String,
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