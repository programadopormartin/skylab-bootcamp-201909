import React,{useContext} from 'react'
import { withRouter } from 'react-router-dom'
import './index.sass'
import {  authenticate, retrieveUser} from '../../logic'
import Context from '../CreateContext'

function Login({history}) {
    const { setUser } = useContext(Context)

    async function onLogin(event) {
        event.preventDefault()
        const {email:{value:email}, password:{value:password}} = event.target
        try {
          const { token } = await authenticate(email, password)
          sessionStorage.token = token
          const user = await retrieveUser(token)
          sessionStorage.id = user.id
          setUser(user)
          history.push('/home')
        } catch (error) {
          console.error(error)
        }
      }

      function onGoRegister(event) { 
        event.preventDefault()
        history.push('/register') 
    }


    return  <section className="login">
    <h1 className="login__title">Login</h1>
    <form className="login__form " onSubmit={onLogin}>
        <input className="login__form__input" type="text" name="email" placeholder="mail@mail.com"></input>
        <input className="login__form__input" type="password" name="password" placeholder="*****"></input>
        <button className="login__form__button">Next</button>
        <a className="login__form__button" href="" onClick={onGoRegister}>Register</a>

    </form>
</section>
}

export default withRouter(Login)
