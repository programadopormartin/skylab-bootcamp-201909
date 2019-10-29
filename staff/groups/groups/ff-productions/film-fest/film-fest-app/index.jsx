const { Component } = React
const { id, token } = sessionStorage


class App extends Component {

    constructor() {
        super()
        this.state = {view:'login', error: undefined, query: undefined, user: undefined, movies: undefined, title: 'Pepito' }
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
            this.setState({ movies: result.results , view: 'landing'})
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

    handleGoGenre = () => {
        this.setState({ view: 'genre' })
    }

    handleGoWatchlist = () => {
        this.setState({ view: 'watchlist' })
    }

    handleGoPersonalArea = () => {

        (sessionStorage.token && sessionStorage.id) ? this.setState({ view: 'personal-area' }) : this.setState({ view: 'login' })

    }

    handleChangeIcon = () => {
        debugger
        console.log("im a changeicon")
    }

    handleResetHash = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior:"smooth"
        })
    }

    handleGoMovieSpecs = (movieId)=> {
        console.log('hola pepe')
    }

 

    render() {
        const { state: { view, error, movies, title }, handleRegister, handleLogin, handleGoLogin, handleGoRegister, handleGoHome, handleGoGenre, handleGoWatchlist, handleGoPersonalArea, handleChangeIcon, handleResetHash, handleGoMovieSpecs } = this

        return <>
            <Header onGoHome={handleGoHome} onGoGenre={handleGoGenre} onGoWatchlist={handleGoWatchlist} onGoPersonalArea={handleGoPersonalArea} />

            {view === 'landing' && movies!== undefined && <Movies title={title} movies={movies} items={movies}  onMovieRender={item=> <MovieItem item={item} key={item.id} onMovieSpecs={handleGoMovieSpecs}/>}/>}
            {view === 'genre' && <Genre />}
            {view === 'watchlist' && <Watchlist />}
            {view === 'personal-area' && <PersonalArea />}
            {view === 'register' && <Register onRegister={handleRegister} onGoLogin={handleGoLogin} error={error} />}
            {view === 'login' && <Login onLogin={handleLogin} onGoRegister={handleGoRegister} error={error} />} 
           
            <Footer onResetHash={handleResetHash} />
            
        </>
    }
}


ReactDOM.render(<App />, document.getElementById('root'))

