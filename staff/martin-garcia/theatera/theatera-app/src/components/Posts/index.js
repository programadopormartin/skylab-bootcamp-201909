import React, {useEffect, useState,useContext} from 'react'
import PostItem from '../Post-Item'
import { withRouter } from 'react-router-dom'
import './index.sass'
import {retrieveLatestPosts} from '../../logic'
import Context from '../CreateContext'



function Posts({history}){

    const { token } = sessionStorage
    const [postsList, setPostsList] = useState([])
    const { setPostId, postId } = useContext(Context)


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

    const handleGoPostDetail = (id) => {
        setPostId(id)
        history.push(`/posts/${id}`)
    }
    

    return  <section className="posts">  
        <ul >
        {postsList.map(post => <li className="post-list__item" key={post.post.id}> <PostItem post={post} onGoPostDetail={handleGoPostDetail} /></li>)}
        </ul>
        </section>
}
           
export default withRouter(Posts)