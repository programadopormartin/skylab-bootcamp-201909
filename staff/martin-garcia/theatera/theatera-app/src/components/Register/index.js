import React from 'react'
import './index.sass'

export default function({onRegister, onGoLogin}){

return <section className="register">
        <h1 className="register__title">Register</h1>
        <form className="register__form " onSubmit={function(event){
            event.preventDefault()
            const {name:{value:name},email:{value:email}, password:{value:password},  account:{checked:account}} = event.target
            onRegister(name, email, password, account)
        }}>
            <input className="register__form__input" name="name" type="text" placeholder="Name"></input>
            <input className="register__form__input" name="email" type="text" placeholder="mail@mail.com"></input>
            <input className="register__form__input" name="password" type="password" placeholder="*****"></input>

            <div className="register__form__radio">
                <h2>Are you a company?</h2>
                <input type="checkbox" name="account" value="company"/>
            </div>
            <button className="register__form__button">Register</button>
            <a className="register__form__button" href="" onClick={function(event){
                event.preventDefault()
                onGoLogin()
            }}>Login</a>
        </form>
    </section>

}