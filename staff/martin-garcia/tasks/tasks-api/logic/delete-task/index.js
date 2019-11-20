const validate = require('../../utils/validate')
const { NotFoundError } = require('../../utils/errors')
const { Types: { ObjectId } } = require('mongoose')
const { models: { User, Task } } = require('../../data')


module.exports = function(userId, taskId) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)
        /*     if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)
         */

    validate.string(taskId)
    validate.string.notVoid('taskId', taskId)
        /*     if (!ObjectId.isValid(taskId)) throw new ContentError(`${taskId} is not a valid task id`)
         */




    return User.findOne({ _id: ObjectId(userId) })
        .then(_user => {
            if (!_user) throw new NotFoundError(`user with id ${id} not found`)
            return Task.findOne({ _id: ObjectId(taskId) })
        })
        .then(task => {
            if (!task) throw new NotFoundError(`user does not have task with id ${taskId}`)
            if (task.user.toString() !== userId.toString()) throw new ConflictError(`user with id ${id} does not correspond to task with id ${taskId}`)

            return Task.deleteOne({ _id: ObjectId(taskId) })
        })
        .then(() => {})
}