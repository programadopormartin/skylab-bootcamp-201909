import React from 'react'
import './index.sass'
/* 
{onRegister, onGoLogin, error} */
export default function() {
    return <section className="register hide">
    <p className="register__title">Join now:</p>
    <form className="register__form" >
        <p className="register__form__p">Name:</p>
        <input type="text" name="name" id="name" placeholder="pepito"/>

        <p className="register__form__p">Last name:</p>
        <input type="text" name="lastName" id="lastName" placeholder="grillo"/>

        <p className="register__form__p">Mail:</p>
        <input type="email" name="mail" id="mail" placeholder="pepitogrillo@duck.com"/>

        <p className="register__form__p">Password:</p>
        <input type="password" name="password" id="password" placeholder="*****"/>

        <p className="register__form__p">Age:</p>
        <input type="number" name="age" id="age" placeholder="18"/>

        <input type="button" className="register__form__login" value="Login" />
        <button className="register__form__register">Register</button>

    </form>

    
</section>

}

/* {error && <Feedback message={error} />} */