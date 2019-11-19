const database = require('../../utils/database')
const validate = require('../../utils/validate')
const { NotFoundError } = require('../../utils/errors')
const { ObjectId } = database


module.exports = function(userId, taskId) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)

    validate.string(taskId)
    validate.string.notVoid('taskId', taskId)

    const cliente = database()

    return cliente.connect()
        .then(connection => {
            debugger
            const users = connection.db().collection('users')
            const tasks = connection.db().collection('tasks')

            return users.findOne({ "_id": ObjectId(userId) })
                .then(_user => {
                    if (!_user) throw new NotFoundError(`user with id ${id} not found`)
                    return tasks.findOne({ "_id": ObjectId(taskId) })
                        .then(_task => {
                            if (!_task) throw new NotFoundError(`task with id ${taskId} not found`)

                            tasks.deleteOne({ "_id": ObjectId(taskId) })
                                .then(result => { return {} })
                        })

                })
        })
}