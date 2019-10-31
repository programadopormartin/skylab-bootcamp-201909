const { Component } = React
const { id, token } = sessionStorage


class App extends Component {

    constructor() {
        super()

        this.state = { view: 'login', error: undefined, query: undefined, user: undefined, movies: [], title: 'Pepito', movie: undefined, title: 'Trendy Movies', genres: undefined }
    }

    componentWillMount() {

        if (id && token) {
            try {
                retrieveUser(id, token, (error, user) => {
                    error ? this.setState({ error: error.message }) : this.setState({ user: user })
                })
            } catch (error) {
                this.setState({ error: error.message })
            }
        }
        try {
            retrieveInitialMovies((error, result) => {

                this.setState({ movies: result.results, view: 'landing' })

                error ? this.setState({ error: error.message }) : this.setState({ movies: result.results, view: 'landing' })
            })

        } catch (error) {
            this.setState({ error: error.message })
        }
        try {
            retrieveGenres((error, result /* genres in past */) => {
                error ? this.setState({ error: error.message }) : this.setState({ genres: result.genres })

            })
        } catch (error) {
            this.setState({ error: erro.message })
        }


    }

    handleLogin = (username, password) => {
        try {
            authenticateUser(username, password, (error, data) => {
                if (error) this.setState({ error: error.message })
                else {
                    try {
                        const { id, token } = data

                        sessionStorage.id = id
                        sessionStorage.token = token

                        retrieveUser(id, token, (error, user) => {
                            if (error) this.setState({ error: error.message })
                            else {
                                this.setState({ view: 'landing', user: user })
                            }
                        })
                    } catch (error) {
                        this.setState({ error: error.message })
                    }
                }
            })
        } catch (error) {
            this.setState({ error: error.message })
        }
    }



    handleRegister = (name, surname, email, password, passwordConfirmation) => {
        try {
            registerUser(name, surname, email, password, passwordConfirmation, error => {
                error ? this.setState({ error: error.message }) : this.setState({ view: 'landing' })
            })
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleGoLogin = () => {
        this.setState({ view: 'login' })
    }

    handleGoRegister = () => {
        this.setState({ view: 'register' })
    }

    handleGoHome = () => {
        try {
            retrieveInitialMovies((error, result) => {
                this.setState({ movies: result.results, view: 'landing' })
                error ? this.setState({ error: error.message }) : this.setState({ movies: result.results, view: 'landing' })
            })
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleGoWatchlist = () => {
        try {
            if (sessionStorage.id && sessionStorage.token) {
                retrieveWatchlistMovies(sessionStorage.id, sessionStorage.token, (error, movies) => {
                    error ? this.setState({ error , view: 'watchlist', movies: []}) : this.setState({ view: 'watchlist', movies })
                })
            } else {
                this.setState({ view: 'login' })
            }
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleGoPersonalArea = () => {

        (sessionStorage.token && sessionStorage.id) ? this.setState({ view: 'personal-area' }) : this.setState({ view: 'login' })

    }


    handleResetHash = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }

    handleGoMovieSpecs = (movieId) => {
        try {
            if (sessionStorage.id && sessionStorage.token) {
                retrieveMovie(movieId, sessionStorage.token, sessionStorage.id, (error, movie) => {
                    error ? this.setState({ error }) : this.setState({ view: 'movie-specs', movie })
                })
            } else {
                retrieveMovie(movieId, undefined, undefined, (error, movie) => {
                    error ? this.setState({ error }) : this.setState({ view: 'movie-specs', movie })
                })
            }
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleToggleFavSpecs = (movieId) => {
        if (sessionStorage.id && sessionStorage.token) {
            try {
                toggleFavMovie(sessionStorage.id, sessionStorage.token, movieId, (result) => {
                    if (result.error) {
                        this.setState({ erro: result.error })
                    } else {
                        retrieveMovie(movieId, sessionStorage.token, sessionStorage.id, (error, movie) => {
                            (error) ? this.setState({ error: error.message }) : this.setState({  view: 'movie-specs', error: undefined, movie })
                        })
                    }
                })

            } catch (error) {
                this.setState({ error: error.message })
            }
        } else {
            this.setState({ error: 'Premiun function, please log in' })

        }
    }
 
    handleToggleFavWatchlist = (movieId) => {
            try {
                toggleFavMovie(sessionStorage.id, sessionStorage.token, movieId, (result) => {
                    if (result.error) {
                        this.setState({ error: result.error })
                    } else {
                        try{
                        retrieveWatchlistMovies(sessionStorage.id, sessionStorage.token, (error, movies) => {
                            error ? this.setState({ error }) : this.setState({ view: 'watchlist', movies })
                        })
                    } catch(error){
                        this.setState({ error: error.message })
                    }
                    }
                })

            } catch (error) {
                this.setState({ error: error.message })
            }
       
    }

    handleGetMoviesByGenre = (genreId, nameGenre) => {
        retrieveGenreIdMovies(genreId, (error, movies) => {
            error ? this.setState({ error: error.message }) : this.setState({ movies: movies.results, view: 'landing', title: nameGenre })
        })
    }

    handleSearchMovies = query => {
        searchMovies(query, (error, movies) => {
            error ? this.setState({ error: error.message }) : this.setState({ movies: movies.results, view: 'landing', title: `Search: ${query}` })
        })
    }

    handleGoRandomMovies = () => {
        retrieveRandomMovies((error, movies) => {
            error ? this.setState({ error: error.message }) : this.setState({ movies: movies.results, view: 'landing', title: `Search: Random Movies` })
        })
    }

    render() {

        const { state: { view, error, movies, title, genres, user, movie }, handleToggleFavSpecs, handleGoMovieSpecs, handleRegister, handleLogin, handleGoLogin, handleGoRegister, handleGoHome, handleGoWatchlist, handleGoPersonalArea, handleGoRandomMovies, handleResetHash, handleGetMoviesByGenre, handleSearchMovies, handleToggleFavWatchlist } = this


        return <>
            <Header onGoHome={handleGoHome} onGoWatchlist={handleGoWatchlist} onGoPersonalArea={handleGoPersonalArea} onGenres={genres} onGetMoviesByGenre={handleGetMoviesByGenre} onSearchMovies={handleSearchMovies} onGoRandomMovies={handleGoRandomMovies} />


            {view === 'landing' && movies !== undefined && <Movies title={title} movies={movies} items={movies} onMovieRender={item => <MovieItem item={item} key={item.id} onMovieSpecs={handleGoMovieSpecs} />} />}
            {view === 'watchlist' && movies !== undefined && <Watchlist title={title} movies={movies} items={movies} onMovieRender={item => <WatchlistItem item={item} key={item.id} onMovieSpecs={handleGoMovieSpecs} onToggleFav={handleToggleFavWatchlist} />} />}
            {view === 'movie-specs' && <MovieSpecs movie={movie} onToggleFavSpecs={handleToggleFavSpecs} error={error} user={user} />}
            {view === 'personal-area' && <PersonalArea user={user} />}
            {view === 'register' && <Register onRegister={handleRegister} onGoLogin={handleGoLogin} error={error} />}
            {view === 'login' && <Login onLogin={handleLogin} onGoRegister={handleGoRegister} error={error} />}

            <Footer onResetHash={handleResetHash} />

        </>
    }
}


ReactDOM.render(<App />, document.getElementById('root'))

