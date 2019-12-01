const { validate, errors: { ConflictError, NotFoundError } } = require('theatera-util')
const { ObjectId, models: { User, } } = require('theatera-data')

module.exports = function(id, name, introduction, description, gender, age, phone, email, website, city, languages, height, weight) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    if (name) {
        validate.string(name)
        validate.string.notVoid('name', name)
    }
    if (introduction) {
        validate.string(introduction)
        validate.string.notVoid('introduction', introduction)
    }
    if (description) {
        validate.string(description)
        validate.string.notVoid('description', description)
    }
    if (city) {
        validate.string(city)
        validate.string.notVoid('city', city)
    }
    if (website) {
        validate.string(website)
        validate.string.notVoid('website', website)
    }
    if (email) {
        validate.string(email)
        validate.string.notVoid('email', email)
    }
    if (phone) {
        validate.string(phone)
        validate.string.notVoid('phone', phone)
    }
    if (gender) {
        validate.string(gender)
        validate.string.notVoid('gender', gender)
        validate.matches('city', description, "MAN", "WOMAN")
    }
    if (age) {
        validate.number(age)
    }
    if (height) {
        validate.number(height)
    }
    if (weight) {
        validate.number(weight)
    }
    if (languages) {
        validate.instanceOf(Array, languages)
    }


    return (async() => {
        const user = await User.findById(id)
        if (!user) throw new NotFoundError(`user with id ${id} not found`)



        description && (user.description = description)
            /* name && (user.name = name)
        introduction && (user.introduction = introduction)
        description && (user.description = description)
        phone && (user.phone = phone)
        city && (user.city = city)
        website && (user.website = website)
        email && (user.email = email)
        if (user.rol === "PERSON") {
            gender && (user.specificInfo.gender = gender)
            age && (user.specificInfo.age = age)
            languages && (user.specificInfo.languages = languages)
            height && (user.specificInfo.height = height)
            weight && (user.specificInfo.weight = weight)
        }
 */
        await user.save
    })()
}