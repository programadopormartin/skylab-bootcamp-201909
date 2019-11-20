const validate = require('../../utils/validate')
const { models: { User } } = require('../../data')
const { NotFoundError } = require('../../utils/errors')

const { Types: { ObjectId } } = require('mongoose')


module.exports = function(id) {
    validate.string(id)
    validate.string.notVoid('id', id)

    return (async() => {
        const user = await User.findById(id)
        if (!user) throw new NotFoundError(`user with id ${id} not found`)
        user.lastAccess = new Date
        const user = await user.save()

        user = user.toObject()

        user.id = user._id.toString()
        delete user._id
        delete user.password

        return user
    })()
}