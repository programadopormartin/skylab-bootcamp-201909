const validate = require('../../utils/validate')
const { models: { User, Task } } = require('../../data')
const { Types: { ObjectId } } = require('mongoose')
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

    return (async() => {
        const user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        const task = await Task.findById(taskId)
        if (!task) throw new NotFoundError(`user does not have task with id ${taskId}`)
        if (task.user !== id) throw new ConflictError(`user with id ${id} does not correspond to task with id ${taskId}`)

        title && (task.title = title)
        description && (task.description = description)
        status && (task.status = status)
        task.lastAccess = new Date

        await task.save()
    })()
}