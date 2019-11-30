const { Schema } = require('mongoose')
const Person = require('./person')

module.exports = new Schema({
    title: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    body: {
        type: String,
        required: true
    },
    type: {
        required: true,
        type: String,
        enum: ['EDUCATION', 'JOB']
    }
})