import React, { useState, useEffect } from 'react'
import './index.sass'
import {withRouter} from 'react-router-dom'
import {retrieveUser} from '../../logic'
import Feedback from '../Feedback'

function Header({history}){

    const { id,token } = sessionStorage
    const [user, setUser] = useState()
    const [error, setError] = useState()

    useEffect(()=>{
        (async()=>{
            try{setUser(await retrieveUser(token)) }
            catch(error){ setError(error.message)  }
        })()
    },[setUser])
    
    function handleGoPersonalProfile(e){
        e.preventDefault()
        console.log("debo de cambiar", id)
        history.push(`/users/${id}`)
    }

    function handleGoChats(e){
        e.preventDefault()
        history.push('/chats')
    }

    function handleSearch(e){
        e.preventDefault()
        const {searchBar:{value:query}} = e.target
        history.push(`/search/${query}`)
    }

    return <header className="header">
     {user &&  <img className="header__image" src={user.image+`?timestamp=${Date.now()}`} alt="profile" onClick={handleGoPersonalProfile}/>}
                <form className=" header__search search " onSubmit={handleSearch}>
                    <input className=" search__bar " name ="searchBar" type="search"  placeholder="&#x1F50D; Search "/>
                </form>
        
                <form action=" " className="header__messages messages ">
                    <button className="messages__buton" onClick={handleGoChats}>
                            <i className="material-icons ">
                                    mail_outline
                                    </i>
                    </button>
                </form>
                {error && <Feedback text={error} />}               
            </header>
}

export default withRouter(Header)