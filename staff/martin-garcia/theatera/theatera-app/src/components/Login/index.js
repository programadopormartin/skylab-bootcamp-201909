import React from 'react'
import './index.sass'

export default function({onLogin, onGoRegister}) {


    return  <section className="login">
    <h1 className="login__title">Login</h1>
    <form className="login__form " onSubmit={function(event){
        event.preventDefault()
        const {email:{value:email}, password:{value:password}} = event.target
        onLogin(email, password)
    }}>
        <input className="login__form__input" type="text" name="email" placeholder="mail@mail.com"></input>
        <input className="login__form__input" type="password" name="password" placeholder="*****"></input>
        <button className="login__form__button">Next</button>
        <a className="login__form__button" href="" onClick={function(e){
            e.preventDefault()
            onGoRegister()
        }}>Register</a>

    </form>
</section>
}