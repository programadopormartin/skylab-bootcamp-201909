import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import './index.sass'
import {retrieveSummaryUser} from '../../logic'


function Message({history, message:{user:userId, body, date}}){
    const {token, id} = sessionStorage
    const [userData, setUserData] = useState()

    useEffect(()=>{
        (async()=>{
            debugger
            setUserData(await retrieveSummaryUser(userId,token))
        })()
    },[setUserData])
 

    return<>{userData && <section  className={userId===id ?"comment comment--mine" : "comment"}>
            <img className="comment__image " src={userData.image} alt="profile " />
                <div className="comment__text text ">
                    <p className="text__user-name ">{userData.name}</p>
                    <p className="text__date ">{date}</p>
                    <p className="text__comment ">{body}</p>
                </div>
            </section>
    }</>
}
export default withRouter(Message)