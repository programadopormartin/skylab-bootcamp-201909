const { validate, errors: { ContentError, NotFoundError } } = require('theatera-util')
const { ObjectId, models: { User } } = require('theatera-data')

module.exports = function(id) {
    validate.string(id)
    validate.string.notVoid('id', id)

    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    return (async() => {
        const user = await User.findById(id)
        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        user.lastAccess = new Date
        await user.save()

        if (user.rol === 'PERSON') {
            const { img, name, email, introduction, specificInfo: { surname }, description, gender, age, phone, website, city, languages, height, weight } = user.toObject()

            return { id, img, name, email, introduction, surname, description, gender, age, phone, website, city, languages, height, weight }
        }

        const { img, name, email, introduction, description, phone, website, city } = user.toObject()

        return { id, img, name, email, introduction, description, phone, website, city }

    })()
}