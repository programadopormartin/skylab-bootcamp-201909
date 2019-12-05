import React from 'react'
import './index.sass'

export default function({comment:{date,description,user, _id}, myId}){
    
    return<> {  <section  className={user._id===myId ?"comment comment--mine" : "comment"}>
    <img className="comment__image" src="https://media.licdn.com/dms/image/C4E03AQHDYmFMm3lIoQ/profile-displayphoto-shrink_200_200/0?e=1580342400&v=beta&t=Eway57teuUv7ff1isfm-jELgO4KR4xqr93sc7qmgwEc" alt="profile image" />
    <div className="comment__text text">
        <p className="text__user-name">{user.name}</p>
        <p className="text__user-info">{user.info}</p>
        <p className="text__date">{date}</p>
        <p className="text__comment">{description}</p>
    </div>
</section>
    }</>
}
