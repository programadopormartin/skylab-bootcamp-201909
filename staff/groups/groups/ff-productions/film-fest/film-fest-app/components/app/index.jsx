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
                    if(error){ console.log(error.message)}
                    else {console.log('user inserted')}
                })
            } catch(error){
                debugger
                console.log(error.message)
            } 
        }

        handleGoLogin = ()=>{
            console.log('handleGoLogin')
        }



        render() {
            const { state: {view, error}, handleRegister, handleGoLogin } = this

            return <>     
                <Header/>
                {view === 'register' && <Register onRegister={handleRegister} onGoLogin={handleGoLogin} error={error}/>} 
                <Footer/>
               </>
        }
}
