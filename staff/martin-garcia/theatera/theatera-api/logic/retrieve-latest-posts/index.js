const { validate, errors: { NotFoundError, ContentError } } = require('theatera-util')
const { ObjectId, models: { User, Post } } = require('theatera-data')

module.exports = function(friendIds) {
    friendIds.forEach(id => {
        validate.string(id)
        validate.string.notVoid('id', id)
        if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)
    })


    return (async() => {

        let posts = []
        posts = await Promise.all(friendIds.map(async userId => {
            const user = await User.findById(userId)
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)
            return await Post.find({ "user": ObjectId(userId) })
        }))

        posts = posts.flat()

        posts.sort(function(a, b) {
            a = new Date(a.date);
            b = new Date(b.date);
            return a > b ? -1 : a < b ? 1 : 0;
        })

        posts = posts.map(post => {
            const { image, name } = user
            const { body, date, likes, comments, type } = post
            return { user: { image, id: user.id, name }, post: { id: post.id, body, date, likes, comments, type } }
        })

        if (posts.length > 20) { posts = posts.length = 20 }

        return posts
    })()
}