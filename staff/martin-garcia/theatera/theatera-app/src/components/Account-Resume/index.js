import React from 'react'
import { withRouter } from 'react-router-dom'
import './index.sass'

function AccountResume({history, account:{id, name, image, introduction}}){

    function onGoToUser(e){
        e.preventDefault()
        history.push(`/users/${id}`)  
        
    }


    return  <div className="acc-resume" onClick={onGoToUser}>
                <img className=" acc-resume__image" src={image} alt=" profile image "/>
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
        

}


export default withRouter(AccountResume)