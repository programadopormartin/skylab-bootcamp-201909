const call = require('../../utils/call')
const { validate, errors: { ConflictError } } = require('theatera-util')
const API_URL = process.env.REACT_APP_API_URL

module.exports = function(token,text) {
    validate.string(text)
    validate.string.notVoid('text', text)
    debugger
    return (async() => {
        const res = await call(`${API_URL}/search/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ text })
        })

            

        if (res.status === 200) return JSON.parse(res.body)

        if (res.status === 409) throw new ConflictError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}