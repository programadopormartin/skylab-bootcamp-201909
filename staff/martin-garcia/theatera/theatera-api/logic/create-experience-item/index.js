const { validate, errors: { NotFoundError, ConflictError } } = require('theatera-util')
const { ObjectId, models: { User, ExperienceItem } } = require('theatera-data')

module.exports = function(userId, title, body, startDate, endDate, type) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)

    validate.string(title)
    validate.string.notVoid('title', title)

    validate.string(body)
    validate.string.notVoid('body', body)

    validate.number(endDate)
    validate.number(startDate)

    return (async() => {
        const user = await User.findById(userId)
        if (!user) throw new NotFoundError(`user with id ${userId} not found`)

        endDate= new Date(endDate)
        startDate = new Date(startDate)

        const experienceItem = new ExperienceItem({ title, body, endDate, startDate, type })
        if (!experienceItem) throw new ConflictError('internal error')

        const inserction = await user.experience.push(experienceItem)
        const save = await user.save()
        return experienceItem.id

    })()


}