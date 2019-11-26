const { Schema, ObjectId } = require('mongoose')
const Comment = require('./comment')

module.exports = new Schema({
    user: {
        type: Object,
        require: true,
        ref: 'User'
    },
    body: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        require: false,
    },
    likes: {
        type: [ObjectId],
        require: false,
        ref: 'User'
    },
    comments: {
        type: [Comment],
        require: false
    },
    type: {
        type: String,
        require: true,
        enum: ['ARTICLE', 'JOB']
    }
})