import React, { useState, useEffect } from 'react'
import './index.sass'
import {withRouter} from 'react-router-dom'
import {retrieveUser} from '../../logic'

function Header({history}){

    const { id,token } = sessionStorage
    const [user, setUser] = useState()

    useEffect(()=>{
        (async()=>{
            setUser(await retrieveUser(token))
        })()
    },[setUser])
    
    function onGoPersonalProfile(e){
        e.preventDefault()
        console.log("debo de cambiar", id)
        history.push(`/users/${id}`)
    }

    return <header className="header">
     {user &&  <img className="header__image" src={user.image} alt="profile" onClick={onGoPersonalProfile}/>}
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