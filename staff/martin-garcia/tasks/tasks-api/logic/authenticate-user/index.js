const validate = require('../../utils/validate')
const { CredentialsError } = require('../../utils/errors')
const { models: { User } } = require('../../data')

module.exports = function(username, password) {
    validate.string(username)
    validate.string.notVoid('username', username)
    validate.string(password)
    validate.string.notVoid('password', password)

    debugger
    return User.findOne({ username, password })
        .then(user => {
            if (!user) throw new CredentialsError('wrong credentials')

            const { _id } = user

            return User.updateOne({ _id }, { $set: { lastAccess: new Date } })
                .then(result => {
                    if (result.nModified === 0) throw Error('could not update user')

                    return _id.toString()
                })

        })
}