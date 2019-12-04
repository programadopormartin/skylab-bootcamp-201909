import React, { useEffect, useState, useContext } from 'react'
import './index.sass'
import { withRouter } from 'react-router-dom'
import {retrievePost} from '../../logic'


function PostDetail({history, postId}){

    const { token } = sessionStorage
    let postData

    useEffect(()=>{
        (async()=>{
            try{
                postData = await retrievePost(token, postId)
                debugger   
            } catch({message}){
                console.log(message)
            }
        })()
    }, [postId])



    return <section className=" post-detail ">

    <section className=" post ">
        <div className=" post__header ">
            <img className=" post-image " src=" https://media.licdn.com/dms/image/C4D03AQGJs_fj9WmNsQ/profile-displayphoto-shrink_200_200/0?e=1579737600&v=beta&t=aXY597WUWHurjEtV8y9ORSngTUm7RYWjjGdoHvpUXCg " alt=" profile
            image " />
            <div className=" header-info ">
                <p className=" header-item header__user-username ">Julian Assange</p>
                <p className=" header-item header__user-introduction ">Dramatic actor</p>
                <p className=" header-item header__date ">24/10/2019 22:30</p>
            </div>
        </div>

        <p className=" post__main ">In the improv troupe I work with, we take turns as the facilitator or director of each performance. Each performer has their own flair or
        </p>

        <div className=" post__interactions ">
            <p className=" post-interactions__likes ">3 likes</p>
            <p className=" post-interactions__comments ">5 comments</p>
        </div>

        <form action=" " className=" post__nav ">
            <button className=" post-button "><i className=" material-icons ">thumb_up_alt</i></button>
            <button className=" post-button "><i className=" material-icons ">comment</i></button>
            <button className=" post-button "><i className=" material-icons ">share</i></button>
        </form>
    </section>


    <section className="comments">
        
    </section>
</section>
}

export default withRouter(PostDetail)