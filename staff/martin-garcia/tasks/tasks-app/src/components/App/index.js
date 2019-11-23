import React from 'react';
import './index.sass';
import Board from '../Board'
import Login from '../Login'
import Register from '../Register'
import {Route, withRouter} from 'react-router-dom'

export default withRouter(function ({ history }) {








  return <>
    <Route path='/login' render={()=><Login />} />
    <Route path='/register' render={()=><Register />} />
    <Route path='/tasks' render={()=><Board />} />
   </>
  
})

