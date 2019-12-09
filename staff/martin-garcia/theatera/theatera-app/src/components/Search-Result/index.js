import React, {useEffect, useState} from 'react'
import AccountResume from '../Account-Resume'
import { withRouter } from 'react-router-dom'
import './index.sass'
import { retrieveConnections } from '../../logic'



function SearchResult({history, query}){

    const {token} = sessionStorage
    const [accounts, setAccounts] = useState()
   

    useEffect(()=>{
        (async()=>{
            try{
                setAccounts(await retrieveConnections(token))
            } catch(message){
                debugger
                console.log(message)
            }
        })()
    },[setAccounts])

   
    return <div className="connections__container">   
       { accounts &&  <ul >
            {accounts.map(account => <li  key={account.id} > <AccountResume  account={account}/></li>)}
        </ul>
         }
    </div>
}
           
export default withRouter(SearchResult)