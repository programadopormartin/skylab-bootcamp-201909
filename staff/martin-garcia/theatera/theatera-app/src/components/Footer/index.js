import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import './index.sass'
import retrieveFriendRequests from '../../logic'


function Footer({history}){

    const { token } = sessionStorage

    /* useEffect(()=>{
        (async()=>{

        })
    },[]) */


    useEffect(()=>{
        (async()=>{
            try{
                await retrieveFriendRequests(token)
            } catch(error){
                console.log(error.message)
            }
        })()
    },[])

    function onGoHome(e){
        e.preventDefault()
        history.push('/home')
    }
    
    function onGoConnections(e){
        e.preventDefault()
        history.push('/connections')
    }
    
    
    function onGoNews(e){
        e.preventDefault()
        history.push('/news')
    }
    
    
    function onGoJobs(e){
        e.preventDefault()
        history.push('/jobs')

    }
    
    function onNewPost(e){
        e.preventDefault()
        history.push('/newpost')
    }




    return <footer className="footer">

    <form  className="footer__list buttons" onSubmit={function(e){
        e.preventDefault()
    }}>
        <button className="buttons__home button" onClick={onGoHome}>
            <i className="button__icon material-icons">home</i>
            <p className="button__text">Home</p>
        </button>

        <button className="buttons__contacs button" onClick={onGoConnections}>
            <i className="material-icons">contacts</i>
            <p className="button__text">Contacs</p>
        </button>

        <button className="buttons__post button" onClick={onNewPost}>
            <i className="material-icons">add_circle_outline</i>
            <p className="button__text">Post</p>
        </button>

        <button className="buttons__notifications button" onClick={onGoNews}>
            <i className="material-icons">notifications_active</i>
            <p className="button__text">News</p>
        </button>

        <button className="buttons__jobs button" onClick={onGoJobs}>
            <i className="material-icons">theaters</i>
            <p className="button__text">Jobs</p>
        </button>
    </form>
</footer>
}

export default withRouter(Footer)