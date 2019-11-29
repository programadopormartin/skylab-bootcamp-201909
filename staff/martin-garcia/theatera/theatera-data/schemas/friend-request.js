const { Schema, ObjectId } = require('mongoose')

module.exports = new Schema({
    creator: {
        type: ObjectId,
        required: true
    },
    receiver: {
        type: ObjectId,
        required: true
    }
})