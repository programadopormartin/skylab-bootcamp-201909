import React from 'react'
import { withRouter } from 'react-router-dom'
import './index.sass'



function Message({history, message:{user:userId, body, date}}){
    const {token, id} = sessionStorage

    return <section  className={userId===id ?"comment comment--mine" : "comment"}>
            <img className="comment__image " src="https://media.licdn.com/dms/image/C4E03AQHDYmFMm3lIoQ/profile-displayphoto-shrink_200_200/0?e=1580342400&amp;v=beta&amp;t=Eway57teuUv7ff1isfm-jELgO4KR4xqr93sc7qmgwEc " alt="profile " />
                <div className="comment__text text ">
                    <p className="text__user-name ">Anna Garriga Martin</p>
                    <p className="text__user-info ">Recruiter IT and ...</p>
                    <p className="text__date ">30/10/2019</p>
                    <p className="text__comment ">Me gusta ofrecer nuevas oportunidades de crecimiento profesional a todos aquellos candidatos que llegan a una primera entrevista conmigo. </p>
                </div>
            </section>
}
export default withRouter(Message)