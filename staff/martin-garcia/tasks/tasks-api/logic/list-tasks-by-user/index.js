const validate = require('../../utils/validate')
const { NotFoundError } = require('../../utils/errors/not-found-error')
const database = require('../../utils/database')
const { ObjectId } = database

module.exports = function(id) {
    validate.string(id)
    validate.string.notVoid('id', id)

    const client = database()
    return client.connect()
        .then(connection => {
            const tasks = connection.db().collection('tasks')
            const users = connection.db().collection('users')

            return users.findOne({ "_id": ObjectId(id) })
                .then(user => {

                    if (!user) throw new NotFoundError(`user with id ${id} not found`)


                    return tasks.find({ "user": id }).toArray()
                        .then((_tasks) => {



                            if (!_tasks) throw new NotFoundError(`_tasks not found`)

                            _tasks.forEach(element => element.lastAcces = new Date);

                            return _tasks
                        })
                })
        })
}