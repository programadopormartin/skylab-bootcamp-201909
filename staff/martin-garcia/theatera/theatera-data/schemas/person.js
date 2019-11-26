const { Schema } = require('mongoose')

module.exports = new Schema({
    surname: {
        type: String,
        require: false,
    },
    age: {
        type: number,
        require: false,
    },
    height: {
        type: number,
        require: false,
    },
    weight: {
        type: number,
        require: false,
    },
    gender: {
        type: String,
        enum: ['MAN', 'WOMAN'],
        require: false,
    }
})