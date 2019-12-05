import React, {useEffect, useState} from 'react'
import AccountResume from '../Account-Resume'
import { withRouter } from 'react-router-dom'
import './index.sass'
import { retrieveConnections } from '../../logic'



function Connections({history}){

    const {token} = sessionStorage
    const [connections, setConnections] = useState()
    let con


    useEffect(()=>{
        (async()=>{
            con = await retrieveConnections(token)
            setConnections(con)
            console.log(con)
        })()
    },[con])

    function clicame(){
        con =2
    }

    return <div className="connections__container">   
       { connections &&  <ul >
            {connections.map(account => <li  > <AccountResume  account={account}/></li>)}
            <div onClick={clicame}>sadfasdfasdf</div>
        </ul>
         }
    </div>
}
           
export default withRouter(Connections)