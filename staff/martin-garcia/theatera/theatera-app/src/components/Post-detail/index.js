import React, { useEffect, useState, useContext } from 'react'
import './index.sass'
import { withRouter } from 'react-router-dom'
import {retrievePost, toggleLikePost, sendComment} from '../../logic'
import CommentItem from '../Comment-Item'
import Context from '../CreateContext'


function PostDetail({history, postId}){
    
    const[render, setRender]= useState()
    const [ user, setUser ] = useState(true)
    const { token } = sessionStorage
    const [post, setPost] = useState()
    let postData
    const {id} = sessionStorage
    let emailInput = React.createRef()
    
    
    useEffect(()=>{
        (async()=>{
            try{
                postData = await retrievePost(token, postId) 
                setPost(postData.post)
                setUser(postData.user)
                debugger
            } catch(message){
                debugger
                console.log(message)
                
            }
        })()
    },[setPost, render])
    

    async function handleGiveLike(e){
        e.preventDefault()
        try{
            await toggleLikePost(post.id, token)
            console.log("non chego")
            setRender(Math.random())
        } catch(error){
            console.log("peto")
            console.log(error)
        }

    }

    async function handleSendComment(e){
        e.preventDefault()
        
        try{
            const {textarea:{value:text}} = e.target
            await sendComment(token, post.id, text)
            setRender(Math.random())
        }catch(error){
            console.log(error)
        }
    }
    function handleFocus(){
        emailInput.current.focus()
    }


   

    return<>{user &&  post && <section className=" post-detail ">

    <section className=" post ">
        <div className=" post__header ">
            <img className=" post-image " src=" https://media.licdn.com/dms/image/C4D03AQGJs_fj9WmNsQ/profile-displayphoto-shrink_200_200/0?e=1579737600&v=beta&t=aXY597WUWHurjEtV8y9ORSngTUm7RYWjjGdoHvpUXCg " alt=" profile
            image " />
            <div className=" header-info ">
                <p className=" header-item header__user-username ">{user.name}</p>
                <p className=" header-item header__user-introduction ">{user.introduction}</p>
                <p className=" header-item header__date ">{post.date}</p>
            </div>
        </div>

        <p className=" post__main ">In the improv troupe I work with, we take turns as the facilitator or director of each performance. Each performer has their own flair or
        </p>

        <div className=" post__interactions ">
            <p className=" post-interactions__likes ">{post.likes.length}  &nbsp;likes</p>
            <p className=" post-interactions__comments ">{post.comments.length} &nbsp;comments</p>
        </div>

        <form className=" post__nav" onSubmit={function(e){
            e.preventDefault()
        }}>
            <button className=" post-button " onClick={handleGiveLike}><i className=" material-icons ">thumb_up_alt</i></button>
            <button className=" post-button " onClick={handleFocus}><i className=" material-icons ">comment</i></button>
            <button className=" post-button "><i className=" material-icons ">share</i></button>
        </form>
    </section>


    <section className="comments">
        <ul >
            {post.comments && post.comments.map(comment => <li key={comment._id}> <CommentItem comment={comment}  myId={id} /></li>)}
        </ul>
    </section>

    <section className="new-comment">
        <img className="new-comment__image" src="https://media.licdn.com/dms/image/C4E03AQHDYmFMm3lIoQ/profile-displayphoto-shrink_200_200/0?e=1580342400&v=beta&t=Eway57teuUv7ff1isfm-jELgO4KR4xqr93sc7qmgwEc" alt="profile image" />
        <form className="new-comment__form form" onSubmit={handleSendComment}>
            <textarea   ref={emailInput} className="form__textarea" name="textarea"  cols="30" rows="2" placeholder="send a comment here ..."></textarea>
            <button className="form__button"><i className="material-icons">send</i></button>
        </form>
    </section>
</section>}</>
}

export default withRouter(PostDetail)