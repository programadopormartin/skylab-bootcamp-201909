function retrieveGenreIdMovies(genreID, callback) {
    call('GET', undefined, `https://api.themoviedb.org/3/discover/movie?api_key=5396c3e7196bcc564336e933d566130b&with_genres=${genreID}`, undefined, result => {

        if (result.status_message) {
            callback(new Error(result.status_message))
        } else {
            result.results.forEach(element => {
                element.poster_path === null && (element.poster_path = 'https://c1.contenidos.com.es//frontpage/home_cat_ARCHIVO.png')
            });
            callback(undefined, result)
        }

    })

}