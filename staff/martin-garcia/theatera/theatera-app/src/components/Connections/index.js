import React, {useEffect, useState} from 'react'
import AccountResume from '../Account-Resume'
import { withRouter } from 'react-router-dom'
import './index.sass'
import { retrieveConnections } from '../../logic'



function Connections({history}){

    const {token} = sessionStorage
    const [connections, setConnections] = useState()
   

    useEffect(()=>{
        (async()=>{
            try{
                setConnections(await retrieveConnections(token))
            } catch(message){
                debugger
                console.log(message)
            }
        })()
    },[setConnections])

   
    return <div className="connections__container">   
       { connections &&  <ul >
            {connections.map(account => <li  key={account.id} > <AccountResume  account={account}/></li>)}
        </ul>
         }
    </div>
}
           
export default withRouter(Connections)