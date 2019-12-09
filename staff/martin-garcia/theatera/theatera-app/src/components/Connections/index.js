import React, {useEffect, useState} from 'react'
import AccountResume from '../Account-Resume'
import { withRouter } from 'react-router-dom'
import './index.sass'
import { retrieveConnections } from '../../logic'
import Feedback from '../Feedback'



function Connections({history}){

    const {token} = sessionStorage
    const [connections, setConnections] = useState()
    const [error, setError] = useState() 

    useEffect(()=>{
        (async()=>{
            try{
                setConnections(await retrieveConnections(token))
            } catch(error){
                setError(error.message)
            }
        })()
    },[setConnections])

   
    return <div className="connections__container">   
       { connections &&  <ul >
            {connections.map(account => <li  key={account.id} > <AccountResume  account={account}/></li>)}
        </ul>
         }
            {error && <Feedback text={error} />}               
    </div>
}
           
export default withRouter(Connections)