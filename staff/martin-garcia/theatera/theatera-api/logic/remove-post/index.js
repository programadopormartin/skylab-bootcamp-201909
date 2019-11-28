const { ObjectId, models: { User } } = require('theatera-data')
const { validate, errors: { ContentError, NotFoundError } } = require('theatera-util')

module.exports = function(userId, postId) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)

    validate.string(postId)
    validate.string.notVoid('postId', postId)
    if (!ObjectId.isValid(postId)) throw new ContentError(`${postId} is not a valid id`)

    return (async() => {
        const user = await User.findById(userId)
        if (!user) throw new NotFoundError(`user with id ${userId} not found`)

        const post = await User.findOne({ "posts._id": ObjectId(postId) }, { "posts.$": 1 })
        if (!post) throw new NotFoundError(`user does not have post with id ${postId}`)

        const arr = await user.posts.filter(ele => ele.id !== postId)
        user.posts = arr
        await user.save()

        return postId
    })()
}