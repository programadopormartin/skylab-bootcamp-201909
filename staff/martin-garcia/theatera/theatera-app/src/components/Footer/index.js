import React from 'react'
import './index.sass'

export default function(){
    return <footer className="footer">

    <form action="" className="footer__list buttons">
        <button className="buttons__home button">
            <i className="button__icon material-icons">home</i>
            <p className="button__text">Home</p>
        </button>

        <button className="buttons__contacs button">
            <i className="material-icons">contacts</i>
            <p className="button__text">Contacs</p>
        </button>

        <button className="buttons__post button">
            <i className="material-icons">add_circle_outline</i>
            <p className="button__text">Post</p>
        </button>

        <button className="buttons__notifications button">
            <i className="material-icons">notifications_active</i>
            <p className="button__text">News</p>
        </button>

        <button className="buttons__jobs button">
            <i className="material-icons">theaters</i>
            <p className="button__text">Jobs</p>
        </button>
    </form>
</footer>
}