const { Component } = React


class App extends Component {

    constructor(){
        super()
        this.state = { view: 'register', error: undefined, query: undefined }
    }

    handleRegister = (name,surname,email,password,passwordConfirmation)=>{
        debugger
         try{
             debugger
            registerUser(name,surname,email,password,passwordConfirmation, error=>{
                debugger
                if(error) this.setState({ error: error.message })
                else this.setState({view:'landing'})
            })
        } catch(error){
            debugger
            this.setState({ error: error.message })
        } 
    }

    handleGoLogin = ()=>{
        console.log('handleGoLogin')
    }



    render() {
        const { state: {view, error}, handleRegister, handleGoLogin } = this

        return <>     
            <Header/>
            {view === 'landing' && <Landing/>}
            {view === 'register' && <Register onRegister={handleRegister} onGoLogin={handleGoLogin} error={error}/>} 
            <Footer/>
           </>
    }
}


ReactDOM.render(<App />, document.getElementById('root'))