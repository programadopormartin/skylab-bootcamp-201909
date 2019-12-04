import React from 'react'
import './index.sass'
import { withRouter } from 'react-router-dom'
import {  retrieveCompleteUser } from '../../logic'


function AccountDetail({userId , history}) {


    
    async function retrieveUser(userId){
        const user = await retrieveCompleteUser(userId,sessionStorage.token)
        return user
    }

    const {image, name,introduction, city} = retrieveUser(userId)


    return   <section className="account-details">
    <section className="account-details__header">
        <div className="account-details__principal principal">
            <img className="principal__image principal-item" src="https://media.licdn.com/dms/image/C4D03AQG-djQa-ZwbJw/profile-displayphoto-shrink_200_200/0?e=1580342400&v=beta&t=Ss_1jT6NUJUD_NrXubCCyvBHx3124-kSTlX4lXdqEy8" alt="profile" />
            <p className="principal__name principal-item">{name}</p>
            <p className="principal__introduction principal-item">{introduction}</p>
            <p className="principal__address principal-item">{city}</p>
            <p className="principal__description principal-item">
                Welcome to my LinkedIn profile! I am a highly motivated Aerospace Engineer (MEng) with experience in the Aerospace and Automotive industries, focusing on delivering satisfaction and tangible added value to all stakeholders of the projects I am involved
                in, while at the same time gaining quality experience to keep growing professionally.
            </p>


        </div>

        <nav className="account-details__header__nav  buttons">
            <button className="buttons__home button">
                        <p className="button__text">Connect</p>
                    </button>
            <button className="buttons__contacs button">
                        <p className="button__text">Info</p>
                    </button>
            <button className="buttons__post button">
                        <p className="button__text">message</p>
                    </button>
            <button className="buttons__notifications button">
                        <p className="button__text">Posts</p>
                    </button>
            <button className="buttons__jobs button">
                        <p className="button__text">Friends</p>
                    </button>
        </nav>
    </section>


    <section className="skills">
        <h2 className="skills__title">Personal skills</h2>
        <ul className="skills__list">

            <li className="skill-item">
                <p>Dramatic</p>
                <form action="" className="skill__less less">
                    <button className="less__button">
                                        <i className="material-icons">remove_circle_outline</i>
                                </button>
                </form>
            </li>

        </ul>
        <form action="" className="skill__more more">
            <input className="more__input" type="text" placeholder="new skill" />
            <button className="more__button">
                        <i className="material-icons">add_circle_outline</i>
                </button>
        </form>
    </section>


    <section className="experience">
        <h2 className="experience__title">Experience</h2>

        <section className="experience-item">
            <div className="experience-item__title title">
                <p className="title__text">Project Manager</p>
                <p className="title__date">20/3/2019 - 15/10/2019</p>
            </div>
            <main className="experience-item__body">
                Comienzo del grado en ingeniería de Obras Públicas en Escuela Técnica Superior de Ingenieros de Caminos, Canales y Puertos (ETSICCP)
            </main>
            <form action="" className="skill__less less">
                <button className="less__button">
                                        <i className="material-icons">remove_circle_outline</i>
                                </button>
            </form>
        </section>

        <section className="experience-item">
            <div className="experience-item__title title">
                <p className="title__text">Full-stack, web developer and backend developer</p>
                <p className="title__date">1/6/2018 - 3/11/2018</p>
            </div>
            <main className="experience-item__body">
                Comienzo del grado en ingeniería de Obras Públicas en Escuela Técnica Superior de Ingenieros de Caminos, Canales y Puertos (ETSICCP)
            </main>
            <form action="" className="skill__less less">
                <button className="less__button">
                                        <i className="material-icons">remove_circle_outline</i>
                                </button>
            </form>
        </section>


        <form action="" className="experience__more more">
            <label className="more__label">
                <input type="text" name="title" placeholder="title here ..." required />
            </label>
            <label className="more__label">
                    <input type="date" name="date-start" required />
                </label>
            <label className="more__label">
                        <input type="date" name="date-end" required />
                    </label>
            <label className="more__label">
                            <textarea  name="description" id=" " cols="30 " rows="3" placeholder="describe me here ... "></textarea>
                        </label>

            <button className="more__button">
                    <i className="material-icons">add_circle_outline</i>
            </button>
        </form>

    </section>



    <section className="experience">
        <h2 className="experience__title">Education</h2>

        <section className="experience-item">
            <div className="experience-item__title title">
                <p className="title__text">Project Manager</p>
                <p className="title__date">20/3/2019 - 15/10/2019</p>
            </div>
            <main className="experience-item__body">
                Comienzo del grado en ingeniería de Obras Públicas en Escuela Técnica Superior de Ingenieros de Caminos, Canales y Puertos (ETSICCP)
            </main>
            <form action="" className="skill__less less">
                <button className="less__button">
                                        <i className="material-icons">remove_circle_outline</i>
                                </button>
            </form>
        </section>

        <section className="experience-item">
            <div className="experience-item__title title">
                <p className="title__text">Full-stack, web developer and backend developer</p>
                <p className="title__date">1/6/2018 - 3/11/2018</p>
            </div>
            <main className="experience-item__body">
                Comienzo del grado en ingeniería de Obras Públicas en Escuela Técnica Superior de Ingenieros de Caminos, Canales y Puertos (ETSICCP)
            </main>
            <form action="" className="skill__less less">
                <button className="less__button">
                                        <i className="material-icons">remove_circle_outline</i>
                                </button>
            </form>
        </section>


        <form action="" className="experience__more more">
            <label className="more__label">
                    <input type="text" name="title" placeholder="title here ..." required />
                </label>
            <label className="more__label">
                        <input type="date" name="date-start" required />
                    </label>
            <label className="more__label">
                            <input type="date" name="date-end" required />
                        </label>
            <label className="more__label">
                                <textarea  name="description" id=" " cols="30 " rows="3" placeholder="describe me here ... "></textarea>
                            </label>

            <button className="more__button">
                        <i className="material-icons">add_circle_outline</i>
                </button>
        </form>


    </section>
    </section>
    }


export default withRouter(AccountDetail)
    