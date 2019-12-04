import React from 'react'
import './index.sass'

export default function({comment:{}}){
    return <section className="comment comment--mine">
    <img className="comment__image" src="https://media.licdn.com/dms/image/C4E03AQHDYmFMm3lIoQ/profile-displayphoto-shrink_200_200/0?e=1580342400&v=beta&t=Eway57teuUv7ff1isfm-jELgO4KR4xqr93sc7qmgwEc" alt="profile image" />
    <div className="comment__text text">
        <p className="text__user-name">Anna Garriga Martin</p>
        <p className="text__user-info">Recruiter IT and ...</p>
        <p className="text__date">30/10/2019</p>
        <p className="text__comment">Me gusta ofrecer nuevas oportunidades de crecimiento profesional a todos aquellos candidatos que llegan a una primera entrevista conmigo. </p>
    </div>
</section>
}
/* 
_id
:
5de80152085a20623b788139
user
:
5de68b5b36df5e4c28e93a4e
description
:
"second comment ever"
date */