function authenticateUser(email, password, callback) {

    debugger
    validate.email(email)
    validate.password(email)
    //validate.typeOf('string', email)
    //validate.string.notVoid(email, email)
    /* validate.typeOf('string', password)
    validate.string.notVoid(password, password)
    validate.function(callback) */
    //validate.callback(callback)

    call('POST', undefined, 'https://skylabcoders.herokuapp.com/api/auth', { username: email, password }, result => {
        result.error ? callback(new Error(result.error)) : callback(undefined, result.data)
    })
}