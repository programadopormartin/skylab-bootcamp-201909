function retrieveRandomMovies(callback) {

    const page = Math.floor(Math.random() * 100)
    const apiKey = "5396c3e7196bcc564336e933d566130b"
    call('GET', undefined, `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en&page=${page}&vote_average.gte=6.9`, undefined, result => {
        result.status_message ? callback(new Error(result.status_message)) : callback(undefined, result);
    })
}