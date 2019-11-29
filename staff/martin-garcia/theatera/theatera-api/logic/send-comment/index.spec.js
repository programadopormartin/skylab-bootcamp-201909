require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const sendComment = require('.')
const { errors: { NotFoundError, ConflictError, ContentError } } = require('theatera-util')
const { ObjectId, database, models: { User, Post, Comment } } = require('theatera-data')

describe('logic - sendComment', () => {
    before(() => database.connect(TEST_DB_URL))

    let userId, postId, description

    beforeEach(async() => {


        const name = `name-${random()}`
        const email = `email-${random()}@mail.com`
        const password = `password-${random()}`
        random() > 0.5 ? rol = 'COMPANY' : rol = 'PERSON'

        await Promise.all([User.deleteMany()])

        let user = await User.create({ name, email, password, rol })
        userId = user.id

        description = `description-${random()}`
        const date = new Date
        const type = 'ARTICLE'
        const body = `body-${random()}`
        const post = new Post({ user: ObjectId(userId), body, type, date })
        postId = post.id

        user.posts.push(post)
        debugger
        await user.save()
    })


    false && it('Should succed on sended comment', async() => {
        //'Here'

        debugger
        const comment = sendComment(userId, postId, description)

        const _post = Post.findById(postId)
        const _comment = _post.comments[0].id
        expect(comment).to.be.equal(_comment)
            //message body

    })


    /* it('should fail on unexisting user and correct post', async() => {
        const userId = ObjectId().toString()

        try {
            await sendComment(userId, postId, description)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with id ${userId} not found`)
        }
    })


    it('should fail on incorrect user objectId', async() => {
        const wrongUserId = `userId-${random()}`

        try {
            await sendComment(wrongUserId, postId, description)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(ContentError)
            expect(error.message).to.equal(`${wrongUserId} is not a valid id`)
        }

    }) */



    after(() => User.deleteMany().then(database.disconnect))

})