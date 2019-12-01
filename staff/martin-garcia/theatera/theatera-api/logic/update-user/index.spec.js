require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const updateUser = require('.')
const { errors: { NotFoundError, ContentError } } = require('theatera-util')
const { ObjectId, database, models: { User, Notification } } = require('theatera-data')





describe('logic - modify task', () => {
    before(() => database.connect(TEST_DB_URL))

    let userId, name, introduction, description, gender, age, phone, email, website, city, languages, height, weight, rol

    beforeEach(async() => {
        name = `name-${random()}`
        email = `email-${random()}@mail.com`
        introduction = `introduction-${random()}`
        description = `description-${random()}`
        gender = `gender-${random()}`
        phone = `phone-${random()}`
        website = `website-${random()}`
        city = `city-${random()}`
        languages = [`language-${random()}`, `language-${random()}`]
        height = `height-${random()}`
        weight = `weight-${random()}`
        rol = "PERSON"
        password = `password-${random()}`


        await User.deleteMany()

        const user = await User.create({ name, password, introduction, description, phone, email, website, city, rol, specificInfo: { languages, height, weight, gender, age } })

        userId = user._id.toString()

    })

    it.only('should succeed on correct user ', async() => {
        const newName = `New-name-${random()}`
        const newIntroduction = `New-introduction-${random()}`
        const newDescription = `New-description-${random()}`
        const newCity = `new-City-${random()}`
        debugger
        const response = await updateUser(userId, newName, newIntroduction, newDescription, undefined, undefined, undefined, undefined, undefined, newCity, undefined, undefined, undefined)

        expect(response).to.not.exist

        const _user = await User.findById(userId)

        expect(_user.description).to.exist
        expect(_user.description).to.be.a('string')
        expect(_user.description).to.have.length.greaterThan(0)
        expect(_user.description).to.equal(newDescription)

        expect(_user.name).to.exist
        expect(_user.name).to.be.a('string')
        expect(_user.name).to.have.length.greaterThan(0)
        expect(_user.name).to.equal(newName)

        expect(_user.city).to.exist
        expect(_user.city).to.be.a('string')
        expect(_user.city).to.have.length.greaterThan(0)
        expect(_user.city).to.equal(newnewCity)

        expect(_user.introduction).to.exist
        expect(_user.introduction).to.be.a('string')
        expect(_user.introduction).to.have.length.greaterThan(0)
        expect(_user.introduction).to.equal(newnewIntroduction)
    })

    it('should succeed on correct user and new data, except for introduction', async() => {
        const taskId = taskIds.random()
        const newDescription = `new-description-${random()}`
        const newStatus = statuses.random()

        const { title } = await Task.findById(taskId)

        const response = await updateUser(id, taskId, undefined, newDescription, newStatus)

        expect(response).to.not.exist

        const task = await Task.findById(taskId)

        expect(task.user.toString()).to.equal(id)

        expect(task.title).to.exist
        expect(task.title).to.be.a('string')
        expect(task.title).to.have.length.greaterThan(0)
        expect(task.title).to.equal(title)

        expect(task.description).to.exist
        expect(task.description).to.be.a('string')
        expect(task.description).to.have.length.greaterThan(0)
        expect(task.description).to.equal(newDescription)

        expect(task.status).to.exist
        expect(task.status).to.be.a('string')
        expect(task.status).to.have.length.greaterThan(0)
        expect(task.status).to.equal(newStatus)

        expect(task.date).to.exist
        expect(task.date).to.be.an.instanceOf(Date)

        expect(task.lastAccess).to.exist
        expect(task.lastAccess).to.be.an.instanceOf(Date)
    })

    it('should succeed on correct user and new task data, except for description', async() => {
        const taskId = taskIds.random()
        const newTitle = `new-title-${random()}`
        const newStatus = statuses.random()

        const { description } = await Task.findById(taskId)

        const response = await updateUser(id, taskId, newTitle, undefined, newStatus)

        expect(response).to.not.exist

        const task = await Task.findById(taskId)

        expect(task.user.toString()).to.equal(id)

        expect(task.title).to.exist
        expect(task.title).to.be.a('string')
        expect(task.title).to.have.length.greaterThan(0)
        expect(task.title).to.equal(newTitle)

        expect(task.description).to.exist
        expect(task.description).to.be.a('string')
        expect(task.description).to.have.length.greaterThan(0)
        expect(task.description).to.equal(description)

        expect(task.status).to.exist
        expect(task.status).to.be.a('string')
        expect(task.status).to.have.length.greaterThan(0)
        expect(task.status).to.equal(newStatus)

        expect(task.date).to.exist
        expect(task.date).to.be.an.instanceOf(Date)

        expect(task.lastAccess).to.exist
        expect(task.lastAccess).to.be.an.instanceOf(Date)
    })


    /*  it('should fail on unexisting user and correct task data', async() => {
        const id = ObjectId().toString()
        const taskId = taskIds.random()
        const newTitle = `new-title-${random()}`
        const newDescription = `new-description-${random()}`
        const newStatus = statuses.random()

        try {
            await updateUser(id, taskId, newTitle, newDescription, newStatus)

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with id ${id} not found`)
        }
    })

    it('should fail on correct user and unexisting task data', async() => {
        const taskId = ObjectId().toString()
        const newTitle = `new-title-${random()}`
        const newDescription = `new-description-${random()}`
        const newStatus = statuses.random()

        try {
            await updateUser(id, taskId, newTitle, newDescription, newStatus)

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user does not have task with id ${taskId}`)
        }
    })

    it('should fail on correct user and wrong task data', async() => {
        const { _id } = await Task.findOne({ _id: { $nin: taskIds.map(taskId => ObjectId(taskId)) } })

        const taskId = _id.toString()
        const newTitle = `new-title-${random()}`
        const newDescription = `new-description-${random()}`
        const newStatus = statuses.random()

        try {
            await updateUser(id, taskId, newTitle, newDescription, newStatus)

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(ConflictError)
            expect(error.message).to.equal(`user with id ${id} does not correspond to task with id ${taskId}`)
        }
    })

    it('should fail on correct user and wrong task status', () => {
        const taskId = taskIds.random()
        const newTitle = `new-title-${random()}`
        const newDescription = `new-description-${random()}`
        const newStatus = 'wrong-status'

        expect(() => updateUser(id, taskId, newTitle, newDescription, newStatus)).to.throw(ContentError, `${newStatus} does not match any of the valid status values: ${statuses}`)
    })
 */
    // TODO other test cases

    after(() => Promise.all([User.deleteMany(), Task.deleteMany()]).then(database.disconnect))
})