const validate = require('../../utils/validate')
const { NotFoundError } = require('../../utils/errors/not-found-error')
const tasks = require('../../data/tasks')()
const users = require('../../data/users')()
module.exports = function(id) {
    validate.string(id)
    validate.string.notVoid('id', id)

    return new Promise((resolve, reject) => {
        const user = users.data.find(user => user.id === id)

        if (!user) return reject(new NotFoundError(`user with id ${id} not found`))
        _tasks = tasks.data.filter(({ user }) => user === id)
        _tasks.forEach(element => element.lastAcces = new Date);

        tasks.persist().then(() => resolve(_tasks)).catch(reject)
    })
}