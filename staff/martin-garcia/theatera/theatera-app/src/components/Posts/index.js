import React, {useEffect, useState,useContext} from 'react'
import PostItem from '../Post-Item'
import { withRouter } from 'react-router-dom'
import './index.sass'
import {retrieveLatestPosts, toggleLikePost} from '../../logic'
import Context from '../CreateContext'



function Posts({history}){

    const[render, setRender]= useState()

    const { token } = sessionStorage
    const [postsList, setPostsList] = useState([])
    const { setPostId, postId } = useContext(Context)


    useEffect( () => {
        (async()=>{
            try{
                const {posts} = await retrieveLatestPosts(token)
                console.log(posts)
                setPostsList(posts)
                debugger
            }catch({ message }){
                console.log(message)
            }
        })()
        
    } , [setPostsList, render] )    

    const handleGoPostDetail = (id) => {
        setPostId(id)
        history.push(`/posts/${id}`)
    }

    const  handleGiveLike =  (id, token) =>{
        try{
            toggleLikePost(id, token)
            .then(()=>{

                console.log("sdfsaf")
                setRender(Math.random()) 
            })

        } catch(error){
            debugger
            console.log(error)
        }
    }
    

    return  <section className="posts">  
        <ul >
        {postsList.map(post => <li className="post-list__item" key={post.post.id}> <PostItem post={post} onGoPostDetail={handleGoPostDetail}  onGiveLike={handleGiveLike}/></li>)}
        </ul>
        </section>
}
           
export default withRouter(Posts)