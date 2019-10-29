function retrieveMovie(movieId, userToken, userID, callback) {
    validate.string(movieId)
    validate.string.notVoid('movieId', movieId)

    const apiKey = '5396c3e7196bcc564336e933d566130b'

    if (userID && userToken) {
        validate.string(userID)
        validate.string.notVoid('userID', userID)
        validate.string(userToken)
        validate.string.notVoid('userToken', userToken)

        //toDo filtrar favoritas

    } else {
        call('GET', token, `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`, undefined, result => {
            result.error ? callback(new Error(result.error)) : callback(undefined, result.data)
        })
    }

}