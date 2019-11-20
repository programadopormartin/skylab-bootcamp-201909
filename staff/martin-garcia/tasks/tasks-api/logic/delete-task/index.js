const validate = require('../../utils/validate')
const { NotFoundError } = require('../../utils/errors')
const { models: { User, Task }, ObjectId } = require('../../data')


module.exports = function(userId, taskId) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)

    validate.string(taskId)
    validate.string.notVoid('taskId', taskId)
    if (!ObjectId.isValid(taskId)) throw new ContentError(`${taskId} is not a valid task id`)

    return User.findById(userId)
        .then(_user => {
            if (!_user) throw new NotFoundError(`user with id ${id} not found`)
            return Task.findById(taskId)
        })
        .then(task => {
            if (!task) throw new NotFoundError(`user does not have task with id ${taskId}`)
            if (task.user.toString() !== userId.toString()) throw new ConflictError(`user with id ${id} does not correspond to task with id ${taskId}`)

            return Task.deleteOne({ _id: ObjectId(taskId) })
        })
        .then(() => {})
}