require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrievePersonalInfo = require('.')
const { errors: { NotFoundError } } = require('theatera-util')
const { database, models: { User, Person } } = require('theatera-data')

describe('logic - retrieve-complete-user', () => {
    before(() => database.connect(TEST_DB_URL))

    let id, img, name, email, introduction, surname, description, gender, age, phone, website, city, languages, height, weight

    beforeEach(async() => {
        name = `name-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        random() > 0.5 ? rol = 'COMPANY' : rol = 'PERSON'
        introduction = `introduction-${random()}`
        description = `description-${random()}`
        description = description.slice(0, 140)
        city = `city-${random()}`
        phone = `phone-${random()}`
        website = `website-${random()}`



        await User.deleteMany()

        if (rol === 'PERSON') {
            surname = `surname-${random()}`
            age = Math.floor(random() * 90)
            random() > 0.5 ? gender = 'MAN' : gender = 'WOMAN'
            languages = [`language-${random()}`, `language-${random()}`]
            height = `${random()}`
            weight = `${random()}`

            const specificInfo = await Person.create({ surname })
            const user = await User.create({ name, email, password, rol, introduction, description, city, phone, website, specificInfo })
            id = user.id
        } else {
            const specificInfo = await Person.create({})
            const user = await User.create({ name, email, password, rol, introduction, description, city, phone, website, specificInfo })
            id = user.id
        }


    })

    it('should succeed on correct user id', async() => {
        const user = await retrievePersonalInfo(id)

        expect(user).to.exist
        expect(user.id).to.equal(id)
        expect(user.id).to.be.a('string')
        expect(user._id).to.not.exist
        expect(user.name).to.equal(name)
        expect(user.name).to.be.a('string')
        expect(user.password).to.be.undefined
        expect(user.introduction).to.equal(introduction)
        expect(user.introduction).to.be.a('string')
        expect(user.introduction).to.equal(introduction)
        expect(user.description).to.equal(description)
        expect(user.description).to.be.a('string')
        expect(user.website).to.equal(website)
        expect(user.website).to.be.a('string')
        expect(user.city).to.equal(city)
        expect(user.city).to.be.a('string')

        if (rol === 'PERSON') {
            expect(user.surname).to.be.a('string')
            expect(user.surname).to.be.equal(surname)
            expect(user.email).to.equal(email)
            expect(user.email).to.be.a('string')
            expect(user.gender).to.equal(gender)
            expect(user.gender).to.be.a('string')
            expect(user.age).to.equal(age)
            expect(user.age).to.be.a('string')
            expect(user.height).to.equal(height)
            expect(user.height).to.be.a('string')
            expect(user.weight).to.equal(weight)
            expect(user.weight).to.be.a('string')
        }

        /* img test? */

    })

    it('should fail on wrong user id', async() => {
        const id = '012345678901234567890123'

        try {
            await retrievePersonalInfo(id)

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