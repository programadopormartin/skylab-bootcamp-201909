import React from 'react'
import './index.sass'
import { withRouter } from 'react-router-dom'
import {  registerUser } from '../../logic'


function Register({history}){

    async function onRegister(event){
        event.preventDefault()
        const {name:{value:name},email:{value:email}, password:{value:password},  account:{checked:account}} = event.target

        try {
            await registerUser(name, email, password, account)
            history.push('/login')
          } catch (error) {
            console.error(error)
          }
    }


    function onGoLogin(event){
        event.preventDefault()
        history.push('/login')    
    }


return <section className="register">
        <h1 className="register__title">Register</h1>
        <form className="register__form " onSubmit={onRegister}>
            <input className="register__form__input" name="name" type="text" placeholder="Name"></input>
            <input className="register__form__input" name="email" type="text" placeholder="mail@mail.com"></input>
            <input className="register__form__input" name="password" type="password" placeholder="*****"></input>

            <div className="register__form__radio">
                <h2>Are you a company?</h2>
                <input type="checkbox" name="account" value="company"/>
            </div>
            <button className="register__form__button">Register</button>
            <a className="register__form__button" href="" onClick={onGoLogin}>Login</a>
        </form>
    </section>

}

export default withRouter(Register)
