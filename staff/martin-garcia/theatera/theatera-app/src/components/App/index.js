import React, { useState, useEffect } from 'react';

import { Route, withRouter } from 'react-router-dom'
import Login from '../Login'
import Register from '../Register'
import Header from '../Header'
import Footer from '../Footer'
import './index.sass'
import { registerUser, authenticate, retrieveUser, retrieveLatestPosts } from '../../logic'

export default withRouter(function ({ history }) {

  const [userId, setUserId] = useState()
  const [name, setName] = useState()
  const [latestsPosts, setLatestPosts] = useState()




  useEffect(() => {
    const { token } = sessionStorage;
    (async () => {
      try {
        if (token) {
          const {id} = await retrieveUser(token)
          const latestPosts = await retrieveLatestPosts(token)
          setUserId(id)
          setLatestPosts(latestPosts)
        }
      }
      catch (error) {
        console.error(error)
      }
    })()
  }, [sessionStorage.token])


  function handleGoToRegister() { history.push('/register') }
  function handleGoToLogin() { history.push('/home') }

  async function handleLogin(email, password) {
    try {
      const { token } = await authenticate(email, password)
      sessionStorage.token = token
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

  return <>
    <Route exact path='/' render={() => <Login onGoRegister={handleGoToRegister} onLogin={handleLogin} />} />
    <Route path='/register' render={() => <Register onGoLogin={handleGoToLogin} onRegister={handleRegister} />} />
    <Route path='/home' render={() => <> <Header /> <Footer /> </>} />
  </>
})