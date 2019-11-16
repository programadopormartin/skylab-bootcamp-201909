const validate = require('../../utils/validate')
const { NotFoundError } = require('../../utils/errors')
const database = require('../../utils/database')
const { ObjectId } = database

module.exports = function(userId, title, description) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    validate.string(title)
    validate.string.notVoid('title', title)
    validate.string(description)
    validate.string.notVoid('description', description)

    const client = database()
    return client.connect()
        .then(connection => {
            tasks = connection.db().collection('tasks')
            users = connection.db().collection('users')

            return users.findOne(ObjectId(userId))
                .then(userExist => {
                    if (!userExist) return reject(new NotFoundError(`user with id ${userId} not found`))
                    const status = 'TODO'
                    const date = new Date
                    const user = userId
                    return tasks.insertOne({ title, user, description, status, date })
                        .then(result => {

                            if (!result.insertedId) throw new Error('failed to create task')
                            return result.insertedId
                        })

                })
        })
}