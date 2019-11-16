const { MongoClient, ObjectId } = require('mongodb')

let client

function database(url) {
    return client ?
        client :
        (() => {
            let connection

            client = new MongoClient(url, { useUnifiedTopology: true })

            const connect = client.connect.bind(client)

            client.connect = function() {
                return connection ?
                    Promise.resolve(connection) :
                    connect().then(_connection => connection = _connection)
            }

            client.close = function() {
                close.call(this)

                client = undefined
            }

            return client
        })()
}

database.ObjectId = ObjectId

module.exports = database