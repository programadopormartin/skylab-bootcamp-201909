const { validate, errors: { NotFoundError } } = require('theatera-util')
const { ObjectId, models: { User } } = require('theatera-data')

module.exports = function(userId) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)

    return (async() => {
        const user = await User.findById(userId)
        if (!user) throw new NotFoundError(`user with id ${userId} not found`)

        let result = []

        result = await Promise.all(user.notifications.map(async con => {
            return n = { body: con.body, id: con._id.toString() }
        }))

        return result
    })()

}