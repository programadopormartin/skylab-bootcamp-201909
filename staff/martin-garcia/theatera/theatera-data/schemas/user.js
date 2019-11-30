const { Schema, ObjectId } = require('mongoose')
const { validators: { isEmail } } = require('theatera-util')
const Chat = require('./chat')
const Post = require('./post')
const User = require('./user')

const ExperienceItem = require('./experienceItem')


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
        type: String,
    },
    lastAccess: {
        type: Date,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    website: {
        type: String,
    },
    introduction: {
        type: String,
    },
    description: {
        type: String,
    },
    skills: {
        type: [String],
    },
    experience: {
        type: [ExperienceItem],

    },
    rol: {
        type: String,
        required: true,
        enum: ['PERSON', 'COMPANY']
    },
    specificInfo: {
        type: Object,
    },
    chats: {
        type: [Chat],
    },
    connections: {
        type: [ObjectId],
        ref: 'Connection'

    },
    notifications: {
        type: [Object],
        default: [],
        ref: "Notification"
    },
})