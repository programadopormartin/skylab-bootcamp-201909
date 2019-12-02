import React from 'react'
import './index.sass'

export default function({onLogin, onGoRegister}) {


    return  <section class="login">
    <h1 class="login__title">Login</h1>
    <form class="login__form " onSubmit={function(event){
        event.preventDefault()
        const {email:{value:email}, password:{value:password}} = event.target
        onLogin(email, password)
    }}>
        <input class="login__form__input" type="text" name="email" placeholder="mail@mail.com"></input>
        <input class="login__form__input" type="password" name="password" placeholder="*****"></input>
        <button class="login__form__button">Next</button>
        <button class="login__form__button" onClick={function(e){
            e.preventDefault()
            onGoRegister()

        }}>Register</button>

    </form>
</section>
}