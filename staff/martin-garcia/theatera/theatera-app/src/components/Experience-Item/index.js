import React from 'react'
import './index.sass'
import {withRouter} from 'react-router-dom'


function ExperienceItem({accountId, experience, onRemoveExperienceItem}){

    const { id } = sessionStorage
    let myAccount
    id === accountId ? myAccount = true: myAccount=false
    console.log( experience, accountId, id)

    

    return <section className="experience-item">
                <div className="experience-item__title title">
                    <p className="title__text">{experience.title}</p>
                    <p className="title__date">{experience.startDate} - {experience.endDate}</p>
                </div>
                <main className="experience-item__body">
                   {experience.body}
                </main>

                {myAccount && <form action="" className="skill__less less">
                    <button className="less__button" onClick={function(e){
                        e.preventDefault()
                        onRemoveExperienceItem(experience._id)
                    }}>
                        <i className="material-icons">remove_circle_outline</i>
                    </button>
                </form>}
            </section>
}

export default withRouter(ExperienceItem)

