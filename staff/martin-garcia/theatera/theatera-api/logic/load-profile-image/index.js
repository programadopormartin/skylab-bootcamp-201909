require('dotenv').config()
const { validate, errors: { ContentError } } = require('theatera-util')
const { ObjectId, models: { User } } = require('theatera-data')
const fs = require('fs')
const path = require('path')

/**
 * Load the user profile image
 * 
 * @param {ObjectId} id of the user
 *
 * @returns {Promise} - data of image  
 */


module.exports = function(id) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)


    return (async() => {
        /*   const user = await User.findById(id)
          if (!user) throw new Error(`user with id ${id} not found`) */


        let goTo = path.join(__dirname, `../../public/data/users/${id}/profile.png`)
        try {
            if (await fs.existsSync(goTo)) {
                return await fs.createReadStream(goTo)
            } else {
                const defaultImage = path.join(__dirname, `../../public/data/users/defaultImage/profile.jpg`)
                return await fs.createReadStream(defaultImage)
            }
        } catch (error) {
            debugger
        }



    })()
}