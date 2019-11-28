require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const createPost = require('.')
const { errors: { NotFoundError, ConflictError, ContentError } } = require('theatera-util')
const { ObjectId, database, models: { User } } = require('theatera-data')

describe('logic - createPost', () => {
    before(() => database.connect(TEST_DB_URL))

    let userId, postId, body, post, type

    beforeEach(async() => {
        const name = `name-${random()}`
        const email = `email-${random()}@mail.com`
        const password = `password-${random()}`
        random() > 0.5 ? rol = 'COMPANY' : rol = 'PERSON'

        await Promise.all([User.deleteMany()])

        let user = await User.create({ name, email, password, rol })
        userId = user.id
        await user.save()
    })


    it('Should succed on correct post', async() => {
        body = `body-${random()}`
        post = await createPost(userId, body)
        user = await User.findById(userId)

        const _post = user.posts.find(ele => {
            return ele.id === post
        })
        expect(_post).to.exist
        expect(_post.body).to.exist
        expect(_post.body).to.equal(body)
    })


    it('should fail on unexisting user and correct post', async() => {
        const userId = ObjectId().toString()

        try {
            await createPost(userId, body)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            debugger
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with id ${userId} not found`)
        }
    })


    it('should fail on incorrect user objectId', async() => {
        const wrongUserId = `userId-${random()}`

        try {
            await createPost(wrongUserId, body)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(ContentError)
            expect(error.message).to.equal(`${wrongUserId} is not a valid id`)
        }

    })



    after(() => User.deleteMany().then(database.disconnect))

})