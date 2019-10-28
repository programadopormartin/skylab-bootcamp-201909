const { Component } = React

class App extends Component {

        constructor(){
            super()
            this.state = { view: 'landing', error: undefined, query: undefined }
        }




        render() {
            const { } = this

            return <>     
                <Header/>
                <Login/>
                <Footer/>
               </>
        }
}
