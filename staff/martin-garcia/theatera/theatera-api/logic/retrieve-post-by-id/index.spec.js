require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrievePostById = require('.')
const { errors: { NotFoundError } } = require('theatera-util')
const { database, models: { User, Post } } = require('theatera-data')

describe('logic - retrieve-post', () => {
    before(() => database.connect(TEST_DB_URL))

    let id, name, email, password, rol, img, introduction

    beforeEach(async() => {
        name = `name-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        random() > 0.5 ? rol = 'COMPANY' : rol = 'PERSON'
        introduction = `introduction-${random()}`

        body = `body-${random()}`
        date = new Date
        type = 'ARTICLE'
        const likes = []
        const comments = []



        await Promise.all([User.deleteMany()])
        let user = await User.create({ name, email, password, rol, introduction })
        userId = user.id
        _userId = user._id
        post = await new Post({ body, date, type, user: _userId, })
        postId = post.id



        user.posts.push(post)

        await user.save()
        user = await User.findById(userId)
        const a = "asdfs"
    })


    it('should succeed on correct user id', async() => {


        const _post = await retrievePostById(userId, postId)


        expect(_post).to.exist
        expect(_post.post.body).to.equal(body)
        expect(_post.post.body).to.be.a('string')


        expect(_post.post.date).to.be.an.instanceOf(Date)

        expect(_post.post.type).to.equal(type)
        expect(_post.post.type).to.be.a('string')

    })

    it('should fail on wrong user userId', async() => {
        const id = '012345678901234567890123'

        try {
            await retrievePostById(id, postId)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with id ${id} not found`)
        }
    })


    // TODO other cases

    after(() => User.deleteMany().then(database.disconnect))
})