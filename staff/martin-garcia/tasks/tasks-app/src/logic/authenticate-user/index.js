const { validate, errors: { CredentialsError } } = require('tasks-util')
const call = require('../../utils/call')
const API_URL = process.env.REACT_APP_API_URL


module.exports = function(username, password) {
    validate.string(username)
    validate.string('username', username)
    validate.string(password)
    validate.string('password', password)

    return (async() => {
        const res = await call(`${API_URL}/auth`, {
            method: 'POST',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })

        if (res.status === 200) return JSON.parse(res.body).token
        if (res.status === 401) throw new CredentialsError(JSON.parse(res.body).message)

    })()

}