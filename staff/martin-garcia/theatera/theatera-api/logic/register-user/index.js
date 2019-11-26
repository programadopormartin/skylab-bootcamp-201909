const { validate, errors: { ConflictError } } = require('theatera-util')
const { models: { User } } = require('theatera-data')

module.exports = function(name, email, password, isCompany) {
    validate.string(name)
    validate.string.notVoid('name', name)
    validate.string(email)
    validate.string.notVoid('e-mail', email)
    validate.email(email)
    validate.string(password)
    validate.string.notVoid('password', password)
    validate.boolean(isCompany)

    return (async() => {
        const user = await User.findOne({ username })

        if (user) throw new ConflictError(`user with username ${username} already exists`)

        await User.create({ name, surname, email, username, password })
    })()
}