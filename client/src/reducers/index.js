import { combineReducers } from 'redux'
import { reducer as reduxForm } from 'redux-form'
import authReducer from './authReducer'
import bungieReducer from './bungieReducer'

export default combineReducers({
  bungie: bungieReducer,
  auth: authReducer,
  form: reduxForm
})
