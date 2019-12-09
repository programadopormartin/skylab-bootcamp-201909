import React, {useEffect, useState} from 'react'
import AccountResume from '../Account-Resume'
import { withRouter } from 'react-router-dom'
import './index.sass'
import { search, retrieveUser} from '../../logic'
import Feedback from '../Feedback'



function SearchResult({history, query}){

    const {token} = sessionStorage
    const [accounts, setAccounts] = useState()
    const [error, setError] = useState()
    const [connections, setConnections] = useState()

    useEffect(()=>{
        (async()=>{
            try{
                setAccounts(await search(token, query))
                const userData = await retrieveUser(token)
                setConnections(userData.connections)
                console.log(accounts)
            } catch(error){
                setError(error.message)
            }
        })()
    },[setAccounts, setError,query])

   
    return <div className="connections__container">   
       { accounts &&  <ul >
            {accounts.map(account => <li  key={account.id} > <AccountResume connections={connections}  account={account}/></li>)}
        </ul>
         }
           {error && <Feedback text={error} />}
    </div>

       

        
}
           
export default withRouter(SearchResult)