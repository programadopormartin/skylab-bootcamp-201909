import React, { useState, useEffect } from 'react'
import './index.sass'
import {withRouter} from 'react-router-dom'
import {createPost, retrieveUser} from '../../logic'

function NewPost({history}){

    const { token, id } = sessionStorage
    const [user, setUser] = useState()

    useEffect(()=>{
        (async()=>{
            setUser(await retrieveUser(token))
            console.log(user)
        })()
    },[setUser])

    async function handleNewPost(e){
        e.preventDefault()
        try{
            const { jobCheckbox:{checked:jobCheckbox}, body:{value:body} } = e.target
            let job
            jobCheckbox === true ? job = 'JOB': job='ARTICLE'
            await createPost(token, body, job) 
            history.push(`/usersPosts/${id}`)
        } catch(error){
            console.log(error)
        }
    }
    return<>{user && <section className=" post ">
    <div className=" post__header ">
        <img className=" post-image " src={user.image} alt=" profile image "/>
        <div className=" header-info ">
            <p className=" header-item header__user-username ">{user.name}</p>
            <p className=" header-item header__user-introduction ">{user.introduction}</p>
        </div>
    </div>
    <form className="post__nav" id='post__nav' onSubmit={handleNewPost}>
        <textarea className="post-textarea " name="body" cols="30 " rows="18 " placeholder="write here     ..."></textarea>

        <div className="post__nav__buttons">
            <button className="post-button"><i className=" material-icons ">add_circle_outline</i>Post</button>

            <label for='job' className="job-checkbox">Job
                <input className="checkbox" type="checkbox" name="jobCheckbox" />
            </label>
        </div>
    </form>
</section>}</>
}

export default withRouter(NewPost)