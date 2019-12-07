import React, {useEffect, useState} from 'react'
import './index.sass'
import { withRouter } from 'react-router-dom'
import {retrievePersonalInfo} from '../../logic'

function PersonalInfo({history, userId}){


    const [user,setUser] = useState()
    const { token, id } = sessionStorage
    
    //imput tracking
    const [_name, setName]= useState(undefined)
    const [_surname, setSurname]= useState(undefined)
    const [_introduction, setIntroduction]= useState(undefined)
    const [_description, setDescription]= useState(undefined)
    const [_age, setAge]= useState(undefined)
    const [_languages, setLanguages]= useState(undefined)
    const [_phone, setPhone]= useState(undefined)
    const [_email, setEmail]= useState(undefined)
    const [_website, setWebsite]= useState(undefined)
    const [_city, setCity]= useState(undefined) 
    const [_gender, setGender]= useState('MAN')
    const [_disabled, setDisabled] = useState(true)



    useEffect(()=>{
       (async()=>{
           try{
            const response = await retrievePersonalInfo(token, userId)
            console.log(response)
            setUser(response)
            setName(response.name)
            setSurname(response.surname)
            setIntroduction(response.introduction)
            setDescription(response.description)
            setAge(response.age)
            setGender(response.gender)
            setLanguages(response.languages)
            setPhone(response.phone)
            setEmail(response.email)
            setWebsite(response.website)
            setCity(response.city)
            console.log(user)

            } catch(error){
               console.log(error)
           }

        })()
    },[setName,setUser,setSurname,setIntroduction, 
        setDescription,setAge,setGender,setLanguages,
        setPhone,setEmail,setWebsite, setCity])


    function handleGoInfo(e){
        e.preventDefault()
        history.push(`/info/${user.id}`)
    }

    function toggleDisabled(e){
        e.preventDefault()
        setDisabled(false)
    }
    

    return <> {user && <section className="personal-info">
    <div className="personal-info-post__header post__header ">
        <img className=" post-image " src=" https://media.licdn.com/dms/image/C4D03AQGJs_fj9WmNsQ/profile-displayphoto-shrink_200_200/0?e=1579737600&v=beta&t=aXY597WUWHurjEtV8y9ORSngTUm7RYWjjGdoHvpUXCg " alt=" profile
            image " />
        <div className=" header-info ">
            <p className=" header-item header__user-username ">{user.name}</p>
            <p className=" header-item header__user-introduction ">{user.introduction}</p>
            <p className=" header-item header__date "></p>
        </div>
    </div>

    <nav className="account-details__header__nav  buttons">
        {userId !== id && <button className="buttons__home button">
                        <p className="button__text">Connect</p>
                    </button>

}
            <button className="buttons__contacs button" onClick={handleGoInfo}>
                        <p className="button__text">Info</p>
                    </button>
                    {userId !== id &&  <button className="buttons__post button">
                        <p className="button__text">message</p>
                    </button>
                    }
            <button className="buttons__notifications button">
                        <p className="button__text">Posts</p>
                    </button>
            <button className="buttons__jobs button">
                        <p className="button__text">Friends</p>
                    </button>
        </nav>

    <form className="personal-info__form info-form" onSubmit={(e)=>{
        e.preventDefault()
        console.log(_gender)
    }}>

        <label className="info-form__label">
            <span>Name: </span>
            <input disabled={_disabled ? 'disabled':''} type="text" name="name" value={_name || ""} onChange={event=>setName(event.target.value)} />
        </label>

        <label className="info-form__label">
            <span>Surname: </span>
            <input disabled={_disabled ? 'disabled':''} type="text" name="surname"  value={_surname || ""} onChange={event=>setSurname(event.target.value)} />
        </label>

        <label className="info-form__label">
            <span>Introduction: </span>
            <textarea disabled={_disabled ? 'disabled':''} name="introduction" id="" cols="30" rows="2"  value={_introduction || ""} onChange={event=>setIntroduction(event.target.value)}></textarea>            
        </label>
     
        <label className="info-form__label">
            <span>Description: </span>
            <textarea disabled={_disabled ? 'disabled':''} name="description" id="" cols="30" rows="8"  value={_description || ""} onChange={event=>setDescription(event.target.value)}></textarea>
        </label>
        
        <label className="info-form__label">
            <span>Age: </span>
            <input disabled={_disabled ? 'disabled':''} type="number" min='16' max='100' name="age"  value={_age || ""} onChange={event=>setAge(event.target.value)} />
        </label>
        
        <label className="info-form__label">
            <span>Mr: </span>
            <input disabled={_disabled ? 'disabled':''} type="radio" name="genre"  value='MAN' checked={_gender === 'MAN'}  onClick={()=>{setGender('MAN')}} onChange={()=>{}}/>
            <span>Mrs: </span>
            <input disabled={_disabled ? 'disabled':''} type="radio" name="genre" value="woman"  value='WOMAN' checked={_gender === 'WOMAN'} onClick={()=>{setGender('WOMAN')}}   onChange={()=>{}}/>
        </label>
        
        <label className="info-form__label">
            <span>Languages: </span>
            <input disabled={_disabled ? 'disabled':''} type="text" name="languages"  value={_languages || ""} onChange={event=>setLanguages(event.target.value)} />
        </label>
        
        <label className="info-form__label">
            <span>Phone: </span>
            <input disabled={_disabled ? 'disabled':''} type="text" name="phone"  value={_phone || ""} onChange={event=>setPhone(event.target.value)} />
        </label>
        
        <label className="info-form__label">
            <span>Email: </span>
            <input disabled={_disabled ? 'disabled':''} type="text" name="email"  value={_email || ""} onChange={event=>setEmail(event.target.value)} />
        </label>

        <label className="info-form__label">
            <span>website: </span>
            <input disabled={_disabled ? 'disabled':''} type="text" name="website"  value={_website || ""} onChange={event=>setWebsite(event.target.value)} />
        </label>
        
        <label className="info-form__label">
            <span>City: </span>
            <input disabled={_disabled ? 'disabled':''} type="text" name="city"  value={_city || ""} onChange={event=>setCity(event.target.value)} />
        </label>
        
        <div className="info-form__buttons buttons">
        <button className="buttons__jobs button" onClick={toggleDisabled}>
            <p className="button__text">Modify</p>
        </button>

        <button disabled={_disabled ? 'disabled':''} className="buttons__jobs button">
            <p className="button__text">Save</p>
        </button>
        </div>
    </form>


</section>}</>
}

export default withRouter(PersonalInfo)



/* 





 */


