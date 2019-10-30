const { Component } = React
const { id, token } = sessionStorage


class App extends Component {

    constructor() {
        super()
        this.state = { view: 'login', error: undefined, query: undefined, user: undefined, movies: undefined, title: 'Pepito', genres: undefined }
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
        retrieveInitialMovies((error, result) => {
            error ? this.setState({ error: error.message }) : this.setState({ movies: result.results, view: 'landing' })
        })

        retrieveGenres((error, result /* genres in past */) => {
            error ? this.setState({ error: error.message }) : this.setState({ genres: result.genres })
        })

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
                if (error) this.setState({ error: error.message })
                else this.setState({ view: 'landing' })
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
        this.setState({ view: 'landing' })
    }

    handleGoWatchlist = () => {
        this.setState({ view: 'watchlist' })
    }

    handleGoPersonalArea = () => {

        (sessionStorage.token && sessionStorage.id) ? this.setState({ view: 'personal-area' }) : this.setState({ view: 'login' })

    }

    handleChangeIcon = () => {
        console.log("im a changeicon")
    }

    handleResetHash = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
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

    render() {
        const { state: { view, error, movies, title, genres }, handleRegister, handleLogin, handleGoLogin, handleGoRegister, handleGoHome, handleGoWatchlist, handleGoPersonalArea, handleChangeIcon, handleMovieRender, handleResetHash, handleGetMoviesByGenre, handleSearchMovies } = this

        return <>
            <Header onGoHome={handleGoHome} onGoWatchlist={handleGoWatchlist} onGoPersonalArea={handleGoPersonalArea} onGenres={genres} onGetMoviesByGenre={handleGetMoviesByGenre} onSearchMovies={handleSearchMovies} />

            {view === 'landing' && movies !== undefined && <Movies title={title} movies={movies} items={movies} onMovieRender={item => <MovieItem item={item} key={item.id} />} />}
            {view === 'watchlist' && <Watchlist />}
            {view === 'personal-area' && <PersonalArea />}
            {view === 'register' && <Register onRegister={handleRegister} onGoLogin={handleGoLogin} error={error} />}
            {view === 'login' && <Login onLogin={handleLogin} onGoRegister={handleGoRegister} error={error} />}

            <Footer onResetHash={handleResetHash} />

        </>
    }
}


ReactDOM.render(<App />, document.getElementById('root'))

