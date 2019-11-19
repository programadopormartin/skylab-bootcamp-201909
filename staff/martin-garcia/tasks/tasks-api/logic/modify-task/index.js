const validate = require('../../utils/validate')
const database = require('../../utils/database')
const { ObjectId } = database
const { NotFoundError, ConflictError } = ('../../utils/errors')


module.exports = function(id, taskId, title, description, status) {
    validate.string(id)
    validate.string.notVoid('id', id)
    validate.string(taskId)
    validate.string.notVoid('taskId', taskId)
    if (title) {
        validate.string(title)
        validate.string.notVoid('title', title)
    }
    if (description) {
        validate.string(description)
        validate.string.notVoid('description', description)
    }
    if (status) {
        validate.string(status)
        validate.string.notVoid('status', status)
        validate.matches('status', status, 'TODO', 'DOING', 'REVIEW', 'DONE')
    }

    const client = database()

    return client.connect()
        .then(connection => {

            const users = connection.db().collection('users')
            const tasks = connection.db().collection('tasks')



            return users.findOne({ "_id": ObjectId(id) })
                .then(user => {

                    if (!user) throw new NotFoundError(`user with id ${id} not found`)

                    return tasks.findOne({ "_id": ObjectId(taskId) })
                        .then(task => {
                            if (!task) return reject(new NotFoundError(`user does not have task with id ${taskId}`))
                            if (task.user !== id) return reject(new ConflictError(`user with id ${id} does not correspond to task with id ${taskId}`))

                            if (!title) title = task.title
                            if (!description) description = task.description
                            if (!status) status = task.status
                            const lastAcces = new Date

                            return tasks.updateOne({ "_id": ObjectId(taskId) }, { $set: { title, description, status, lastAcces } })
                                .then(result => {})

                        })
                })
        })
}