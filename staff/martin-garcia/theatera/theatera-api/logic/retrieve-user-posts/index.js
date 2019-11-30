const { validate, errors: { NotFoundError, ContentError } } = require('theatera-util')
const { ObjectId, models: { User, Post } } = require('theatera-data')

module.exports = function(userId) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)

    return (async() => {
        const user = await User.findById(userId)
        if (!user) throw new NotFoundError(`user with id ${userId} not found`)

        let posts = await Post.find({ "user": ObjectId(userId) })

        let result = []

        debugger

        result = await Promise.all(posts.map(async post => {
            const { image, name } = user
            const { body, date, likes, comments, type } = post
            return { user: { image, id: user.id, name }, post: { id: post.id, body, date, likes, comments, type } }
        }))

        return result
    })()
}