import React, {useEffect, useState} from 'react'
import NewsItem from '../NewsItem'
import { withRouter } from 'react-router-dom'
import './index.sass'
import { retrieveNews } from '../../logic'
import Feedback from '../Feedback'
import {removeNews, checkFriendRequest} from '../../logic'





function News({history}){

    const {token} = sessionStorage
    const [news, setNews] = useState()
    const [error, setError] = useState() 
    const [render, setRender] = useState(true)

    useEffect(()=>{
        (async()=>{
            try{
                setNews(await retrieveNews(token))
                console.log(news)
            } catch(error){
                debugger
                setError(error.message)
            }
        })()
    },[setNews, setError, render])


    async function handleAddContact(userId, newsId){
        try{
            await checkFriendRequest(token, userId)
            debugger
            await removeNews(token, newsId)
            setRender(!render)
        } catch(error){
            setError(error.message)
        }

    }

    async function handleDeniedFriendRequest(newsId){
        try{
            await removeNews(token, newsId)
            setRender(!render)
        } catch(error){
            setError(error.message)
        }
    }

   
    return <div className="connections__container">   
       { news &&  <ul >
            {news.map(element => <li  key={element._id} > <NewsItem news={element}  onAddContact={handleAddContact} onDeniedFriendRequest={handleDeniedFriendRequest} /></li>)}
        </ul>
         }
            {error && <Feedback text={error} />}               
    </div>
}
           
export default withRouter(News)