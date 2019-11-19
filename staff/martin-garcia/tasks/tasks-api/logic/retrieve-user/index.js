const validate = require('../../utils/validate')
const { models: { User } } = require('../../data')
const { NotFoundError } = require('../../utils/errors')
const { ObjectId } = require('mongoose')


module.exports = function(id) {
    validate.string(id)
    validate.string.notVoid('id', id)

    const users = connection.db().collection('users')
    debugger
    return User.findOne({ _id: ObjectId(id) })
        .then(user => {
            debugger
            if (!user) return reject(new NotFoundError(`user with id ${id} not found`))
            const { name, surname, email, username } = user
            const lastAccess = new Date

            debugger
            return User.updateOne({ _id: ObjectId(id) }, { $set: { lastAccess } })
                .then(() => ({ name, surname, email, username, lastAccess }))
        })

}