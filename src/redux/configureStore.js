import authReducer from './authReducer'
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk'


const optionalState = {
  id:0,
  displayName :'displayName',
  username:"username",
  password:"testpassword",
  image:'',
  isLoggedIn:true
}

const configureStore = (loggedInState=optionalState) => {
   return createStore(authReducer, loggedInState, applyMiddleware(thunk,logger))
}

export default configureStore

