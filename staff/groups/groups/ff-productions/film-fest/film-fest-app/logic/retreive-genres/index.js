function retrieveGenres(callback) {
    call('GET', undefined, 'https://api.themoviedb.org/3/genre/movie/list?api_key=5396c3e7196bcc564336e933d566130b&language=en-US', undefined, result => {
        
        result.status_message ? callback(new Error(result.status_message)) : callback(undefined, result);
    })
}