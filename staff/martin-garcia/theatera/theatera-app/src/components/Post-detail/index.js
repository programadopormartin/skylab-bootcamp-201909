import React, { useEffect, useState, useContext } from 'react'
import './index.sass'
import { withRouter } from 'react-router-dom'
import {retrievePost, toggleLikePost} from '../../logic'
import '../Comment-Item'


function PostDetail({history, postId}){

    const { token } = sessionStorage
    const [user, setUser] = useState()
    const [post, setPost] = useState()
    let postData
    
    useEffect(()=>{
        (async()=>{
            try{
                postData = await retrievePost(token, postId) 
                setPost(postData.post)
                setUser(postData.user)
                console.log(postData)
            } catch({message}){
                console.log(message)
            }
        })()
    }, [setPost])


    async function handleGiveLike(){
        toggleLikePost(post.id, token)
        postData = await retrievePost(token, postId) 
    }


    return<>{user && <section className=" post-detail ">

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
            <button className=" post-button "><i className=" material-icons ">comment</i></button>
            <button className=" post-button "><i className=" material-icons ">share</i></button>
        </form>
    </section>


    <section className="comments">
        <ul >
            {post.comments.map(comment => <li key={post.comment.id}> <CommentItem comment={comment} /></li>)}
        </ul>
    </section>

    <section className="new-comment">
        <img className="new-comment__image" src="https://media.licdn.com/dms/image/C4E03AQHDYmFMm3lIoQ/profile-displayphoto-shrink_200_200/0?e=1580342400&v=beta&t=Eway57teuUv7ff1isfm-jELgO4KR4xqr93sc7qmgwEc" alt="profile image" />
        <form action="" className="new-comment__form form">
            <textarea className="form__textarea" name="" id="" cols="30" rows="2" placeholder="send a comment here ..."></textarea>
            <button className="form__button"><i className="material-icons">send</i></button>
        </form>
    </section>
</section>}</>
}

export default withRouter(PostDetail)