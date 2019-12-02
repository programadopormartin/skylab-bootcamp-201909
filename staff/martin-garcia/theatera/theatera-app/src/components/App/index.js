import React from 'react';

import { Route, withRouter } from 'react-router-dom'
import Login from '../Login'
import './'

export default withRouter(function ({ history }) {
  
  function handleGoToRegister(){

  }

  function handleLogin(){
    
  }

    return <>
        <Route exact path="/" render={()=> <Login onGoRegister={handleGoToRegister} onLogin={handleLogin}/>} />

          </>
})