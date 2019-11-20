const validate = require('../../utils/validate')
const { models: { User } } = require('../../data')
const { NotFoundError } = require('../../utils/errors')

const { Types: { ObjectId } } = require('mongoose')


module.exports = function(id) {
    validate.string(id)
    validate.string.notVoid('id', id)

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} not found`)
            const { name, surname, email, username } = user
            user.lastAccess = new Date
            return user.save()
        })
        .then(user => {
            user = user.toObject()

            user.id = user._id.toString()
            delete user._id
            delete user.password

            return user
        })
}