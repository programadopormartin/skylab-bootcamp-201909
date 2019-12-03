import React from 'react'
import './index.sass'

export default function({post:{post:{body,comments,date,likes,id}, user:{image, introduction,name}}}){
return <section className="post" id={id}>
<div className="post__header">
    <img className="post-image" src={image} alt="profile  " />
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

<form action=" " className="post__nav ">
    <button className="post-button "><i className="material-icons">thumb_up_alt</i></button>
    <button className="post-button "><i className="material-icons ">comment</i></button>
    <button className="post-button "><i className="material-icons ">share</i></button>
</form>
</section>
}
