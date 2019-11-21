const { validate, errors: { NotFoundError } } = require('tasks-util')
const { ObjectId, models: { User } } = require('tasks-data')




module.exports = function(id) {
    validate.string(id)
    validate.string.notVoid('id', id)

    return (async() => {
        let user = await User.findById(id)
        if (!user) throw new NotFoundError(`user with id ${id} not found`)
        user.lastAccess = new Date
        user = await user.save()

        user = user.toObject()

        user.id = user._id.toString()
        delete user._id
        delete user.password
        delete user.__v

        return user
    })()
}