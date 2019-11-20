const validate = require('../../utils/validate')
const { NotFoundError } = require('../../utils/errors/not-found-error')
const { models: { User, Task } } = require('../../data')
const { Types: { ObjectId } } = require('mongoose')

module.exports = function(id) {
    validate.string(id)
    validate.string.notVoid('id', id)

    return (async() => {
            const user = await User.findById(id)
            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            await Task.updateMany({ user: id }, { $set: { lastAccess: new Date } })

            const tasks = await Task.find({ user: id }).lean()

            tasks.forEach(element => {
                element.id = element._id.toString()
                delete element._id
                element.user = id
            });
            return tasks
        })
        ()
}