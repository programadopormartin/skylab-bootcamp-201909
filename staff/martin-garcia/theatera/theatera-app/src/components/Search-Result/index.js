import React, {useEffect, useState} from 'react'
import AccountResume from '../Account-Resume'
import { withRouter } from 'react-router-dom'
import './index.sass'
import { search } from '../../logic'
import Feedback from '../Feedback'



function SearchResult({history, query}){

    const {token} = sessionStorage
    const [accounts, setAccounts] = useState()
    const [error, setError] = useState()

    useEffect(()=>{
        (async()=>{
            try{
                setAccounts(await search(token, query))
            } catch(err){
                debugger
                setError(err.message)
                debugger
                console.log(err)
            }
        })()
    },[setAccounts])

   
    return <div className="connections__container">   
       { accounts &&  <ul >
            {accounts.map(account => <li  key={account.id} > <AccountResume  account={account}/></li>)}
        </ul>
         }
           {error && <Feedback text={error} />}
    </div>

       

        
}
           
export default withRouter(SearchResult)