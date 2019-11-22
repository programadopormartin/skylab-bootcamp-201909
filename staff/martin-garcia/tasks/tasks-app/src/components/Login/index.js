import React from 'react'
import './index.sass'

/* {onLogin, onGoRegister,error} */

/* {error && < Feedback message={error} />}
 */
export default function (){
return <section className="login">
    <p className="login__title">Please log in:</p>
    <nav className="login__nav">
        <form className="login__form">
            <input type="text" name="mail" id="mail" placeholder="pepitogrillo@duck.com" />
            <input type="password" name="password" id="password" />
            <input type="button" className="login__form__register" value="Register" />
            <button className="login__form__button">Login</button>
        </form>
    </nav>
    
</section>
}