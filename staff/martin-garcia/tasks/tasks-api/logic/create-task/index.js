const users = require('../../data/users')()
const tasks = require('../../data/tasks')()
const validate = require('../../utils/validate')
const { NotFoundError } = require('../../utils/errors')
const uuid = require('uuid/v4')


module.exports = function(userId, title, description) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    validate.string(title)
    validate.string.notVoid('title', title)
    validate.string(description)
    validate.string.notVoid('description', description)
    debugger
    return new Promise((resolve, reject) => {
        debugger
        const user = users.data.find(user => user.id === userId)

        if (!user) return reject(new NotFoundError(`user with id ${userId} not found`))

        const task = {
            id: uuid(),
            user: userId,
            title,
            description,
            status: 'TODO',
            date: new Date
        }

        tasks.data.push(task)

        tasks.persist()
            .then(() => resolve(task.id))
            .catch(reject)
    })
}