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
        required: false
    },
    lastAccess: {
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
    experience: {
        type: [ExperienceItem],
        required: false
    },
    rol: {
        type: String,
        required: true,
        enum: ['PERSON', 'COMPANY']
    },
    specificInfo: {
        type: Object,
        required: false
    },
    chats: {
        type: [Chat],
        require: false
    },
    posts: {
        type: [Post],
        required: false
    },
    connections: {
        type: [ObjectId],
        required: false
    },
    new: {
        type: String,
        required: false
    },
    pending: {
        type: ObjectId,
        required: false
    }
})