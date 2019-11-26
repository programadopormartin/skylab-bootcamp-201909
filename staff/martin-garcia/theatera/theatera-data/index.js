const { connect, disconnect, ObjectId } = require('mongoose')

module.exports = {
    database: {
        connect(url) {
            return connect(url, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
        },
        disconnect
    },
    models: require('./models'),
    ObjectId
}