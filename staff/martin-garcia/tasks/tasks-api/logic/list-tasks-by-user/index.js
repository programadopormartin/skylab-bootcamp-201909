const validate = require('../../utils/validate')
const { NotFoundError } = require('../../utils/errors/not-found-error')
const { models: { User, Task } } = require('../../data')
const { Types: { ObjectId } } = require('mongoose')

module.exports = function(id) {
    validate.string(id)
    validate.string.notVoid('id', id)



    return User.findOne({ _id: ObjectId(id) })
        .then(user => {

            if (!user) throw new NotFoundError(`user with id ${id} not found`)


            return Task.find({ "user": id })
        })
        .then((_tasks) => {
            if (!_tasks) throw new NotFoundError(`_tasks not found`)
            const lastAcces = new Date

            const updates = _tasks.map(({ _id }) => Task.updateOne({ _id }, { $set: { lastAcces } }))

            return Promise.all(updates)
                .then(() => {


                    _tasks.forEach(element => {
                        element.id = element._id.toString()
                        delete element._id

                        element.lastAcces = lastAcces
                    });

                    return _tasks

                })

        })
}