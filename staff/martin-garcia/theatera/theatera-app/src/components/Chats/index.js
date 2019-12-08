import React, {useEffect, useState} from 'react'
import AccountResume from '../Account-Resume'
import { withRouter } from 'react-router-dom'
import './index.sass'
import { retrieveChats } from '../../logic'



function Chats({history}){

    const {token} = sessionStorage
    const [chats, setChats] = useState()
    let chatsRefresher
   

    useEffect(()=>{
        if (typeof chatsRefresher !== 'number' ) chatsRefresher = setInterval(()=>{
            (async()=>{
                try{
                    setChats(await retrieveChats(token))
                    console.log(chats)
                } catch(message){
                    debugger
                    console.log(message)
                }
            })()
        }, 30000);
        (async()=>{
            try{
                setChats(await retrieveChats(token))
            } catch(message){
                debugger
                console.log(message)
            }
        })()
        return ()=>{clearInterval(chatsRefresher)}
    },[setChats])

   
    return <div className="connections__container">   
       { chats &&  <ul >
            {chats.map(chat => <li  key={chat.id} > <AccountResume  chat={chat}/></li>)}
        </ul>
         }
    </div>
}
           
export default withRouter(Chats)