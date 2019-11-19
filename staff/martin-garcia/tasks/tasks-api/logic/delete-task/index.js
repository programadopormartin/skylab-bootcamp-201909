const validate = require('../../utils/validate')
const { NotFoundError } = require('../../utils/errors')
const { Types: { ObjectId } } = require('mongoose')
const { models: { User, Task } } = require('../../data')


module.exports = function(userId, taskId) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)

    validate.string(taskId)
    validate.string.notVoid('taskId', taskId)




    return User.findOne({ _id: ObjectId(userId) })
        .then(_user => {
            if (!_user) throw new NotFoundError(`user with id ${id} not found`)
            return Task.findOne({ _id: ObjectId(taskId) })
                .then(_task => {
                    if (!_task) throw new NotFoundError(`task with id ${taskId} not found`)

                    return Task.deleteOne({ _id: ObjectId(taskId) })
                })
                .then(() => { return {} })
        })
}