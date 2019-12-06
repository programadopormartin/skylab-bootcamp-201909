import React, {useState} from 'react'
import './index.sass'
import { withRouter } from 'react-router-dom'


function PostItem({history, post:{post:{body,comments,date,likes,id}, user:{image, introduction,name, id:userId}}, onGoPostDetail, onGiveLike}){

    const {token} = sessionStorage
 
    function onGoAccount(e){
        e.stopPropagation()
        e.preventDefault()
        history.push(`/users/${userId}`)
    }



return <section className="post" id={id}>
<div className="post__header" onClick={onGoAccount}>
    <img className="post-image" src={image} alt="profile " />
    <div className="header-info">
        <p className="header-item header__user-username">{name}</p>
        <p className="header-item header__user-introduction">{introduction}</p>
        <p className="header-item header__date">{date}</p>
    </div>
</div>

<p className="post__main">{body}</p>

<div className="post__interactions">
    <p className="post-interactions__likes">{likes.length} likes</p>
    <p className="post-interactions__comments">{comments.length} comments</p>
</div>

<form action=" " className="post__nav " onSubmit={function(event){
    event.preventDefault()
}}>
    <button className="post-button "><i className="material-icons"  onClick={function(e){
        e.preventDefault()
         onGiveLike(id, token)}
         }>thumb_up_alt</i></button>
    <button className="post-button "><i className="material-icons " onClick={function(e){
        e.preventDefault()
        onGoPostDetail(id)
    }}>comment</i></button>
{/*     <button className="post-button "><i className="material-icons " onClick={}>share</i></button>
 */}</form>
</section>
}

export default withRouter(PostItem)
