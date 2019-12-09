import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import './index.sass'
import Feedback from '../Feedback'
import {createChat} from '../../logic'

function AccountResume({history, account:{id:accountId, name, image, introduction}}){

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

    return  <div className="acc-resume" onClick={onGoToUser}>
                <img className=" acc-resume__image" src={image} alt=" profile image "/>
                <div className=" acc-resume__info info">
                    <p className=" info__username ">{name}</p>
                    <p className=" info__description ">{introduction}</p>
                </div>

                <form className="acc-resume__form " action="">
                    <button className="button">
                        <i className="material-icons">remove_circle_outline</i>
                    </button>
                    <button className="button" onClick={handleChat}>
                            <i className="material-icons">comment</i>
                    </button>
                </form>
                {error && <Feedback text={error} />}
            </div>
}


export default withRouter(AccountResume)