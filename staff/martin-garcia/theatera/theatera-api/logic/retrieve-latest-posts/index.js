const { validate, errors: { NotFoundError, ContentError } } = require('theatera-util')
const { ObjectId, models: { User, Post } } = require('theatera-data')

module.exports = function(id) {

    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)
    return (async() => {

        const friendsOwner = await User.findById(id)
        if (!friendsOwner) throw new NotFoundError(`user with id ${id} not found`)


        let posts = []
        posts = await Promise.all(friendsOwner.connections.map(async userId => {
            const user = await User.findById(userId)
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)
            const post = await Post.find({ "user": ObjectId(userId) })
            let introduction = user.introduction;
            !introduction ? introduction = '' : introduction = introduction.slice(0, 20) + '...'
            const { name, image } = user
            const _user = { name, image, introduction }

            const result = post.map(element => {
                return { post: element, user: _user }
            })

            return result
        }))

        posts = posts.flat()

        posts.sort(function(a, b) {
            a = new Date(a.post.date);
            b = new Date(b.post.date);
            return a > b ? -1 : a < b ? 1 : 0;
        })

        if (posts.length > 20) { posts = posts.length = 20 }

        return posts
    })()
}