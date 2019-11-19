const validate = require('../../utils/validate')
const database = require('../../utils/database')
const { NotFoundError } = require('../../utils/errors')
const { ObjectId } = database

debugger
module.exports = function(id) {
    validate.string(id)
    validate.string.notVoid('id', id)

    const client = database()

    return client.connect()
        .then(connection => {
            const users = connection.db().collection('users')

            return users.findOne({ _id: ObjectId(id) })
                .then(user => {

                    debugger
                    if (!user) return reject(new NotFoundError(`user with id ${id} not found`))
                    const { name, surname, email, username } = user
                    const lastAccess = new Date

                    debugger
                    return users.updateOne({ _id: ObjectId(id) }, { $set: { lastAccess } })
                        .then(() => ({ name, surname, email, username, lastAccess }))
                })
        })
}