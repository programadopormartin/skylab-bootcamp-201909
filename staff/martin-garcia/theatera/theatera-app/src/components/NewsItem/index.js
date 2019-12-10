import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import './index.sass'
import Feedback from '../Feedback'
import {createChat, checkFriendRequest} from '../../logic'
import moment from 'moment'

function NewsItem({history, news:{_id:newsId, body:{message, name,image, id:userID, date}}}){

    const {token, id} = sessionStorage
    const [error, setError]= useState()
    let connected= false
    let friendRequest


  
    return  <div className="acc-resume">
                <img className=" acc-resume__image" src={image} alt="profile" />
                <div className=" acc-resume__info info" >
                    <p className=" info__username ">{name}</p>
                    <p className=" info__description ">{introduction}</p>
                </div>

                 <form className="acc-resume__form " action="">
                   
                    <button className="button">
                        <i className="material-icons">add_circle_outline</i>
                    </button>
                    
                    <button className="button" >
                            <i className="material-icons">comment</i>
                    </button>
                </form>
                {error && <Feedback text={error} />}
            </div>
}


export default withRouter(NewsItem)
