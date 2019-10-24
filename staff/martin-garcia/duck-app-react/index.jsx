const { Component } = React
const { id, token } = sessionStorage

class App extends Component {
    constructor() {
        super()

        this.state = { view: id && token ? 'search' : 'login', error: undefined, ducks: this.handleSearch(''), duckSpecs: undefined, user: undefined }

    }

    componentWillMount() {
        if (id && token) {
            retrieveUser(id, token, (result) => {

                if (result.status) {
                    console.log(result)

                    this.setState({ view: 'search', user: result.data.username })
                } else {
                    this.setState({ error: 'Your backend programmers sucks' })
                }
            })
        }
    }


    handleLogin = (mail, password) => {
        try {
            logIn(mail, password, (error, data) => {
                if (error) { this.setState({ error: error.message }) }
                else {
                    sessionStorage.setItem('id', data.id)
                    sessionStorage.setItem('token', data.token)

                    retrieveDucks('', id, token, (error, ducks) => {
                        if (error) {
                            this.setState({ error: error.message })
                        } else {

                            ducks = ducks.shuffle().slice(0, 7)
                            this.setState({ view: 'search', ducks, user: mail })

                        }
                    })
                }
            })
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleRegister = (name, lastName, mail, password, age) => {
        try {
            registUser(name, lastName, mail, password, age, (error, data) => {
                if (error) {
                    this.setState({ error: error.message })
                } else {
                    this.setState({ view: 'login' })
                }
            })
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleGoToLogin = () => {
        this.setState({ view: 'login' })
    }

    handleGoToRegister = () => {
        this.setState({ view: 'register' })
    }

    handleSearch = (query) => {
        try {
            retrieveDucks(query, id, token, (error, ducks) => {
                if (error) {
                    this.setState({ error: error.message })
                } else {
                    debugger
                    this.setState({ view:'search', error: undefined, ducks })

                }
            })
        } catch (error) {
            this.setState({ error: error.message })

        }
    }

    handleDetail = (id) => {
        try {
            retrieveDuck(id, (error, duckSpecs) => {
                if (error) {
                    this.setState({ error: error.message })
                } else {


                    this.setState({ view: 'detail', duckSpecs })
                }
            })

        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleGoBack = () => {

        this.setState({ view: 'search' })
    }

    handleSignOut = () => {
        this.setState({ view: 'login', user: undefined })
        sessionStorage.clear()
    }

    handleToggleFavDuck = (duckId) => {
        try {
            retrieveFavDucks(id, token, (error, favArray) => {
                if(error){
                    this.setState({ error: error.message })
                } else{
                    debugger
                    favArray.includes(duckId)  ? favArray.splice(favArray.indexOf(duckId),1) :favArray.push(duckId)
                    debugger
                    updateFavDucks(id, token, favArray, (result)=>{
                        debugger
                        (result.error) ? this.setState({error:'Unexpected error, couldnt add to favourite'}) : this.setState({view:'search'})
                    })
                    this.handleSearch('')
                }
            })
        }
        catch (error) {
            this.setState({error})
        }
    }



    render() {
        const { state: { view, error, ducks, duckSpecs, user }, handleGoToRegister, handleGoToLogin, handleRegister, handleLogin, handleSearch, handleDetail, handleGoBack, handleSignOut, handleToggleFavDuck } = this

        return <>
            <Header user={user} onSignOut={handleSignOut} />
            {view.includes('login') && <Login onLogin={handleLogin} onGoRegister={handleGoToRegister} error={error} />}
            {view.includes('register') && <Register onRegister={handleRegister} onGoLogin={handleGoToLogin} error={error} />}
            {view.includes('search') && <Search onSearch={handleSearch} error={error} results={ducks} onResultsRender={results => <Results items={results} onItemRender={item => <ResultItem item={item} key={item.id} onClick={handleDetail} onToggleFav={handleToggleFavDuck} />} />} />}
            {view.includes('detail') && <Detail onGoBack={handleGoBack} duckSpecs={duckSpecs} />}
            <Footer />
        </>
    }
}

ReactDOM.render(<App />, document.getElementById('root'))