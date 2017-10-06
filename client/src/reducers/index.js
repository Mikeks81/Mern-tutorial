import { combineReducers } from 'redux'
import { reducer as reduxForm } from 'redux-form'
import authReducer from './authReducer'
import bungieReducer from './bungieReducer'
import gearReducer from './gearReducer'

export default combineReducers({
  gearDetails: gearReducer,
  bungie: bungieReducer,
  auth: authReducer,
  form: reduxForm
})
