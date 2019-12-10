import React, {useEffect, useState} from 'react'
import NewsItem from '../NewsItem'
import { withRouter } from 'react-router-dom'
import './index.sass'
import { retrieveNews } from '../../logic'
import Feedback from '../Feedback'




function News({history}){

    const {token} = sessionStorage
    const [news, setNews] = useState()
    const [error, setError] = useState() 

    useEffect(()=>{
        (async()=>{
            try{
                setNews(await retrieveNews(token))
            } catch(error){
                setError(error.message)
            }
        })()
    },[setConnections])

   
    return <div className="connections__container">   
       { news &&  <ul >
            {news.map(element => <li  key={account.id} > <NewsItem news={element} /></li>)}
        </ul>
         }
            {error && <Feedback text={error} />}               
    </div>
}
           
export default withRouter(News)