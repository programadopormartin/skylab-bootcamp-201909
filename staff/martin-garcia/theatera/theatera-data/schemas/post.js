const { Schema, ObjectId } = require('mongoose')
const Comment = require('./comment')
const Post = require('./post')


module.exports = new Schema({
    user: {
        type: ObjectId,
        require: true,
        ref: 'User'
    },
    body: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        require: true,
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