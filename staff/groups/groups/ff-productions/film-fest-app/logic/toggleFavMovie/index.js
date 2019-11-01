function toggleFavMovie(userId, userToken, movieId, callback) {

    call('GET', userToken, 'https://skylabcoders.herokuapp.com/api/user/' + userId, undefined, (result) => {
        if (result.error) {
            callback(new Error(result.error));
        } else {
            let favArray = []
            if (result.data.favs) {
                favArray = result.data.favs
            }
            favArray.includes(movieId) ? favArray.splice(favArray.indexOf(movieId), 1) : favArray.push(movieId)

            const body = { 'favs': favArray }

            call('PUT', userToken, 'https://skylabcoders.herokuapp.com/api/user/' + userId, body, (result) => {

                if (result.error) {
                    callback(new Error(result.error));
                } else {
                    callback(result)
                }
            });

        }
    });


}