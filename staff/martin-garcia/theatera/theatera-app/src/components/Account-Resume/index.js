import React from 'react'
import { withRouter } from 'react-router-dom'
import './index.sass'

function AccountResume({account:{id, name, image, introduction}}){
    return  <a>
    
        <div className="acc-resume">
            <img className=" acc-resume__image" src=" https://media.licdn.com/dms/image/C4D03AQGJs_fj9WmNsQ/profile-displayphoto-shrink_200_200/0?e=1579737600&amp;v=beta&amp;t=aXY597WUWHurjEtV8y9ORSngTUm7RYWjjGdoHvpUXCg " alt=" profile image "/>
            <div className=" acc-resume__info info">
                <p className=" info__username ">{name}</p>
                <p className=" info__description ">{introduction}</p>
            </div>

            <form className="acc-resume__form " action="">
                <button className="button">
                    <i className="material-icons">remove_circle_outline</i>
                </button>
                <button className="button">
                        <i className="material-icons">comment</i>
                </button>
            </form>

        </div>
        </a>

}


export default withRouter(AccountResume)