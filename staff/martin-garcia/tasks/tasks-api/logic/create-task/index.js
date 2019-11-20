const validate = require('../../utils/validate')
const { NotFoundError } = require('../../utils/errors')
const { models: { User, Task } } = require('../../data')
const { Types: { ObjectId } } = require('mongoose')

module.exports = function(userId, title, description) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    validate.string(title)
    validate.string.notVoid('title', title)
    validate.string(description)
    validate.string.notVoid('description', description)

    return User.findOne(ObjectId(userId))
        .then(userExist => {
            if (!userExist) return reject(new NotFoundError(`user with id ${userId} not found`))
            const status = 'TODO'
            const date = new Date
            const user = userId
            return Task.create({ title, user, description, status, date })
        })
        .then(task => task.id)
}