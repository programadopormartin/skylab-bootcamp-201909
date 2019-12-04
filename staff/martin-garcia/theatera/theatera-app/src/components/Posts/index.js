import React, {useEffect, useState} from 'react'
import PostItem from '../Post-Item'
import { withRouter } from 'react-router-dom'
import './index.sass'
import {retrieveLatestPosts} from '../../logic'


function Posts({}){

    const { token } = sessionStorage
    const [postsList, setPostsList] = useState([])

    useEffect( () => {
        (async()=>{
            try{
                const {posts} = await retrieveLatestPosts(token)
                setPostsList(posts)
            }catch({ message }){
                console.log(message)
            }
        })()
        
    } , [setPostsList] )    
    

    return  <section className="posts">  
        <ul >
        {postsList.map(post => <li className="post-list__item" key={post.post.id}> <PostItem post={post}  /></li>)}
        </ul>
        </section>
}
           
export default withRouter(Posts)