const { Schema, ObjectId } = require('mongoose')

module.exports = new Schema({
    title: {
        type: String,
        required: true,
    },
    startdate: {
        type: Date,
        required: false
    },
    enddate: {
        type: Date,
        required: false
    },
    body: {
        type: Person,
        required: true
    }
})