const { Schema, ObjectId } = require('mongoose')


module.exports = new Schema({
    body: {
        type: Object,
        required: true
    }
})