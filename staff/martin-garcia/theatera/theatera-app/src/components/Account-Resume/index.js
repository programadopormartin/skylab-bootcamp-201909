import React from 'react'
import { withRouter } from 'react-router-dom'
import './index.sass'
import {createChat} from '../../logic'
import { create } from 'domain'

function AccountResume({history, account:{id:accountId, name, image, introduction}}){

    const {token, id} = sessionStorage

    function onGoToUser(e){
        e.preventDefault()
        history.push(`/users/${accountId}`)  
        
    }

    async function handleChat(e){
/*         e.preventDefault()
 */     
        try{
            debugger
            e.stopPropagation()
            const chatId = await createChat(token, accountId)
            debugger
            history.push(`/chat/${chatId}`)
        }catch(error){
            console.log(error)
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

            </div>
        

}


export default withRouter(AccountResume)