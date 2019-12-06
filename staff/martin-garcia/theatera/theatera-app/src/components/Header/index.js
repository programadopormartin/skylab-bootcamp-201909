import React from 'react'
import './index.sass'
import {withRouter} from 'react-router-dom'

function Header({history}){

    const { id } = sessionStorage

    function onGoPersonalProfile(e){
        e.preventDefault()
        console.log("debo de cambiar", id)
        history.push(`/users/${id}`)
    }

    return <header className="header">
    <img className="header__image" src="https://media.licdn.com/dms/image/C4D03AQGJs_fj9WmNsQ/profile-displayphoto-shrink_200_200/0?e=1579737600&v=beta&t=aXY597WUWHurjEtV8y9ORSngTUm7RYWjjGdoHvpUXCg" alt="profile" onClick={onGoPersonalProfile}/>
                <form className=" header__search search " action=" ">
                    <input className=" search__bar " type=" search "  placeholder="&#x1F50D; Search "/>
                </form>
        
                <form action=" " className="header__messages messages ">
                    <button className="messages__buton ">
                            <i className="material-icons ">
                                    mail_outline
                                    </i>
                    </button>
                </form>
            </header>
}

export default withRouter(Header)