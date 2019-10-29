function registerUser(name, surname, email, password, passwordConfirmation, callback) {
    if (typeof name !== 'string') throw new TypeError(name + ' is not a string')
    if (!name.trim().length) throw new ContentError('name is empty or blank')
    if (typeof surname !== 'string') throw new TypeError(surname + ' is not a string')
    if (!surname.trim().length) throw new ContentError('surname is empty or blank')
    if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if (!email.trim().length) throw new ContentError('e-mail is empty or blank')
    if (typeof password !== 'string') throw new TypeError(password + ' is not a string')
    if (!password.trim().length) throw new ContentError('password is empty or blank')
    if (typeof passwordConfirmation !== 'string') throw new TypeError(passwordConfirmation + ' is not a string')
    if (!passwordConfirmation.trim().length) throw new ContentError('passwordConfirmation is empty or blank')
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')


    passwordConfirmation !== password ? callback(new Error('passwords do not match')) : call('POST', undefined, 'https://skylabcoders.herokuapp.com/api/user', { name, surname, username: email, password }, result => {
        debugger
        result.error ? callback(new Error(result.error.message)) : callback(undefined, result);
    })
}