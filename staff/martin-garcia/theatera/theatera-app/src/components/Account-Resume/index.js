import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import './index.sass'
import Feedback from '../Feedback'
import {createChat} from '../../logic'

function AccountResume({history, account:{id:accountId, name, image, introduction}, connections}){

    const {token, id} = sessionStorage
    const [error, setError]= useState()

    function onGoToUser(e){
        e.preventDefault()
        history.push(`/users/${accountId}`)  
    }

    async function handleChat(e){     
        try{
            e.stopPropagation()
            const chatId = await createChat(token, accountId)
            history.push(`/chat/${chatId}`)
        }catch(error){
            setError(error.message)
        }
    }

    async function handleSendFriendRequest(e){
        e.preventDefault()
        console.log("engadir amigo")
    }

    async function handleRemoveFriend(e){
        e.preventDefault()
        console.log("eliminar amigo")
    }

    return  <div className="acc-resume">
                <img className=" acc-resume__image" src={image} alt="profile"  onClick={onGoToUser}/>
                <div className=" acc-resume__info info" onClick={onGoToUser}>
                    <p className=" info__username ">{name}</p>
                    <p className=" info__description ">{introduction}</p>
                </div>

                {connections && <form className="acc-resume__form " action="">
                    {connections.includes(accountId) ?
                    <button className="button" onClick={handleRemoveFriend}>
                    <i className="material-icons">remove_circle_outline</i>
                </button>:
                    <button className="button" onClick={handleSendFriendRequest}>
                        <i className="material-icons">add_circle_outline</i>
                    </button>
                    }
                    <button className="button" onClick={handleChat}>
                            <i className="material-icons">comment</i>
                    </button>
                </form>}
                {error && <Feedback text={error} />}
            </div>
}


export default withRouter(AccountResume)