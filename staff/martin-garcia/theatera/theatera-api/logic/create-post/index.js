const { validate, errors: { ContentError, NotFoundError } } = require('theatera-util')
const { ObjectId, models: { User, Post } } = require('theatera-data')

module.exports = function(userId, body) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)

    validate.string(body)
    validate.string.notVoid('body', body)

    return (async() => {
        const _user = await User.findById(userId)
        if (!_user) throw new NotFoundError(`user with id ${userId} not found`)

        const date = new Date
        const type = 'ARTICLE'
        const user = _user._id
        const likes = []
        const comments = []

        const post = await new Post({ date, type, user, likes, comments, body })
        _user.posts.push(post)
        await _user.save()
        return post.id

    })()


}