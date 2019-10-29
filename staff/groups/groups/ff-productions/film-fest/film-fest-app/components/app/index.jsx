const { Component } = React

class App extends Component {

        constructor(){
            super()
            this.state = { view: 'register', error: undefined, query: undefined, }
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

        handleResetHash = () => {
            
            window.location.href.split('#')[0]
        }


        render() {
            const { state: {view, error}, handleRegister, handleGoLogin, handleResetHash } = this

            return <>     
                {view === 'footer' && <Footer onResetHash={handleResetHash} />}
                {view === 'register' && <Register onRegister={handleRegister} onGoLogin={handleGoLogin} error={error}/>} 
                <Login/>
               
               </>
        }
}
