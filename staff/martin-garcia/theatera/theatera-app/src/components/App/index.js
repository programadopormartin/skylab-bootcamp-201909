import React, { useState, useEffect } from 'react';

import { Route, withRouter, Redirect } from 'react-router-dom'
import Login from '../Login'
import Register from '../Register'
import Header from '../Header'
import Footer from '../Footer'
import Posts from '../Posts'
import AccountDetail from '../Account-Detail'
import PostDetail from '../Post-detail'

import Context from '../CreateContext'

import './index.sass'

export default withRouter(function () {

  const [user, setUser] = useState()
  const { token } = sessionStorage
  let postId

  return <>
  <Context.Provider value={{user, setUser}}>
    <Route exact path='/' render={() => token ? <Redirect to="/home" /> : <Login />} />
    <Route path='/login' render={() => <Login/>} />
    <Route path='/register' render={() => <Register/>} />
    <Route path='/home' render={() => token ? <> <Header/>   <Posts />    <Footer />  </> : <Login  />} />
    <Route path='/account' render={() =>  token ? <> <Header/>   <AccountDetail   />  <Footer />  </> :<Login/>} />  
    <Route path='/post/' render={() =>  token ? <> <Header/>   <PostDetail  postId={postId}  />  <Footer />  </> :<Login/>} />  
    </Context.Provider>
    </>
})

