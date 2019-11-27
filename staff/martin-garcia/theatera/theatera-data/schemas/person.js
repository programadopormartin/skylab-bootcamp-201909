const { Schema } = require('mongoose')

module.exports = new Schema({
    surname: {
        type: String,
        require: false,
    },
    age: {
        type: Number,
        require: false,
    },
    height: {
        type: Number,
        require: false,
    },
    weight: {
        type: Number,
        require: false,
    },
    languages: {
        type: String,
        require: false
    },
    gender: {
        type: String,
        enum: ['MAN', 'WOMAN'],
        require: false,
    }
})