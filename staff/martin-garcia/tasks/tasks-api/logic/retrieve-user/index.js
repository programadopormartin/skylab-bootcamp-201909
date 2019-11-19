const validate = require('../../utils/validate')
const { models: { User } } = require('../../data')
const { NotFoundError } = require('../../utils/errors')

const { Types: { ObjectId } } = require('mongoose')


module.exports = function(id) {
    validate.string(id)
    validate.string.notVoid('id', id)

    return User.findOne({ _id: ObjectId(id) })
        .then(user => {
            if (!user) return reject(new NotFoundError(`user with id ${id} not found`))
            const { name, surname, email, username } = user
            const lastAccess = new Date

            return User.updateOne({ _id: ObjectId(id) }, { $set: { lastAccess } })
                .then(result => {
                    if (result.nModified === 0) throw Error('could not retrieve user')
                    return { name, surname, email, username, lastAccess }
                })
        })

}