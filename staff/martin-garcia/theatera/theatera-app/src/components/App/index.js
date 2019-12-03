import React, { useState, useEffect } from 'react';

import { Route, withRouter } from 'react-router-dom'
import Login from '../Login'
import Register from '../Register'
import Header from '../Header'
import Footer from '../Footer'
import Posts from '../Posts'
import AccountDetail from '../Account-Detail'


import './index.sass'
import { registerUser, authenticate, retrieveUser, retrieveLatestPosts, retrieveCompleteUser } from '../../logic'

export default withRouter(function ({ history }) {

  const [userId, setUserId] = useState()
  const [view, setView] = useState('login')
  const [user, setUser]=useState()
/*   const [name, setName] = useState()
 */ 
const [latestsPosts, setLatestPosts] = useState()

const { token } = sessionStorage



  useEffect(() => {
    (async () => {
      try {
        if(token){
          const {id} = await retrieveUser(token)
          setUserId(id)
          let posts = await retrieveLatestPosts(token)
          posts = posts.posts
          setLatestPosts(posts)
        }
        
      }
      catch (error) {
        console.error(error)
      }
    })()
  }, [] )


  function handleGoToRegister() { history.push('/register') }
  function handleGoToLogin() { history.push('/home') }
  function handleGoToHome() { history.push('/home') }




  async function handleLogin(email, password) {
    try {
      const { token } = await authenticate(email, password)
      sessionStorage.token = token
      let posts = await retrieveLatestPosts(token)
      posts = posts.posts
      setLatestPosts(posts)
      history.push('/home')
    } catch (error) {
      console.error(error)
    }
  }

  async function handleRegister(name, email, password, account) {
    try {
      await registerUser(name, email, password, account)
      history.push('/login')
    } catch (error) {
      console.error(error)
    }
  }

  async function handleGoPersonalProfile(){
    try{
      const user = await retrieveCompleteUser(userId,token)
      setUser(user)
      history.push(`/account/${userId}`)
    }catch(error){
      console.error(error)
    }
  }



  return <>
    <Route exact path='/' render={() => <Login onGoRegister={handleGoToRegister} onLogin={handleLogin} />} />
    <Route path='/register' render={() => <Register onGoLogin={handleGoToLogin} onRegister={handleRegister} />} />
    <Route path='/home' render={() => latestsPosts && token ? <> <Header onGoPersonalProfile={handleGoPersonalProfile}/>   {<Posts posts={latestsPosts}  />}    <Footer onGoHome={handleGoToHome} />  </> :<Login onGoRegister={handleGoToRegister} onLogin={handleLogin} />} />
    <Route path='/account' render={() => token && user ?  <> <Header onGoPersonalProfile={handleGoPersonalProfile}/>   <AccountDetail user={user}  />  <Footer onGoHome={handleGoToHome} />  </> :<Login onGoRegister={handleGoToRegister} onLogin={handleLogin} />} />  </>
})

