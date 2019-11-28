const { Schema } = require('mongoose')
const Post = require('./post')


module.exports = new Schema({
    jobs: {
        type: [Post],
        require: false,
    }
})