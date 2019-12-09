const { validate, errors: { NotFoundError, ContentError } } = require('theatera-util')
const { ObjectId, models: { User } } = require('theatera-data')

module.exports = function(query) {
    validate.string(query)
    validate.string.notVoid('query', query)

    return (async() => {
        let response
        let responsesArray = []

        response = await User.find( { "name" : {$regex : `.*${query}*`, $options: 'i'}},)
        response && responsesArray.push(response)
        responsesArray = responsesArray.flat()

        result = []

        responsesArray.forEach(
            (friend) => {
                let ok = true
                for (let i = 0; i < result.length && ok; i++) {
                    let following = result[i];
                    if (following['id'] == friend['id'])
                        ok = false;
                }
                if (ok) result.push(friend)
            })

        results = result.map(user => {
            const { _id, name, image, introduction } = user.toObject()
            const specificInfo = user.toObject().specificInfo
            return { id: _id.toString(), name, image, introduction }
        })

        return results
    })()
}