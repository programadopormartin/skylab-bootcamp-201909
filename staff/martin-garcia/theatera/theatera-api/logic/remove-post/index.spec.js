require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const removePost = require('.')
const { errors: { NotFoundError } } = require('theatera-util')
const { ObjectId, database, models: { User, Post } } = require('theatera-data')

describe('logic - removePost', () => {
    before(() => database.connect(TEST_DB_URL))

    let userId, postId, body, date, type

    beforeEach(async() => {
        name = `name-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        random() > 0.5 ? rol = 'COMPANY' : rol = 'PERSON'

        body = `body-${random()}`
        date = new Date
        type = 'ARTICLE'
        const likes = []
        const comments = []



        await Promise.all([User.deleteMany()])
        let user = await User.create({ name, email, password, rol })
        userId = user.id
        _userId = user._id
        post = await new Post({ body, date, type, user: _userId, })
        postId = post.id



        user.posts.push(post)

        await user.save()
        user = await User.findById(userId)
        const a = "asdfs"
    })

    it('Should succed on correct post', async() => {


        user = await User.findById(userId)
        const postBeforeRemove = user.posts.find(ele => ele.id === postId)
        expect(postBeforeRemove).to.exist

        expect(postBeforeRemove.body).to.exist
        expect(postBeforeRemove.date).to.exist
        expect(postBeforeRemove.type).to.exist

        await removePost(userId, postId)

        user = await User.findById(userId)
        const postAfterRemove = user.posts.find(ele => ele.id === postId)

        expect(postAfterRemove).to.not.exist

    })


    it('should fail on unexisting user and correct post', async() => {
        const userId = ObjectId().toString()

        try {
            await removePost(userId, postId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with id ${userId} not found`)
        }
    })

    it('should fail on correct user and unexisting post data', async() => {
        const postId = ObjectId().toString()

        try {
            await removePost(userId, postId)

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user does not have post with id ${postId}`)
        }
    })


    after(() => User.deleteMany().then(database.disconnect))

})