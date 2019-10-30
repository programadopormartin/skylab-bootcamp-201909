function retrieveGenreIdMovies(genreID, callback) {
    call('GET', undefined, `https://api.themoviedb.org/3/discover/movie?api_key=5396c3e7196bcc564336e933d566130b&with_genres=${genreID}`, undefined, result => {
        
        result.status_message ? callback(new Error(result.status_message)) : callback(undefined, result);
    })
}