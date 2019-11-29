const { validate, errors: { ContentError, NotFoundError, ConflictError } } = require('theatera-util')
const { ObjectId, models: { User, Post, Comment } } = require('theatera-data')

module.exports = function(userId, postId, description) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)

    validate.string(postId)
    validate.string.notVoid('postId', postId)
    if (!ObjectId.isValid(postId)) throw new ContentError(`${postId} is not a valid id`)

    return (async() => {
        const user = await User.findById(userId)
        if (!user) throw new NotFoundError(`user with id ${userId} not found`)

        let commentId = undefined

        await user.posts.filter(async p => {
            if (p.id === postId) {
                comment = new Comment({ user: userId, description, date: new Date })
                if (!comment) throw new ConflictError('internal error')
                commentId = comment.id
                p.comments.push(comment)
                await user.save()
            }
        })
        return commentId
    })()


}