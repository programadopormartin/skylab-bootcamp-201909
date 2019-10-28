const { Component } = React

class App extends Component {

        constructor(){
            super()
            this.state = { view: 'register', error: undefined, query: undefined }
        }

        handleRegister = (name,surname,email,password,passwordConfirmation)=>{
            debugger
             try{
                console.log('handleRegister')
                registerUser(name,surname,email,password,passwordConfirmation, error=>{
                    if(error) console.log(error.message)
                    else console.log('user inserted')
                })
                console.log('handleRegister')
            } catch(error){
                debugger
                console.log(error.message)
            } 
        }

        handleGoLogin = ()=>{
            console.log('handleGoLogin')
        }



        render() {
            const { state: {view}, handleRegister, handleGoLogin } = this

            return <>     
                <Header/>
                {view === 'register' && <Register onRegister={handleRegister} onGoLogin={handleGoLogin}/>} 
                <Footer/>
               </>
        }
}
