const { Schema } = require('mongoose')
const { doMatch } = require('../../utils/validators')

module.exports = new Schema({
    title: {
        type: String,
        require: false
    },
    description: {
        type: String,
        require: false
    },
    status: {
        type: String,
        require: true,
        doMatch: true

    },
    user: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    lastAccess: {
        type: Date,
        require: false
    }

})