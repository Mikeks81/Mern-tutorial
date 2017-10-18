import { combineReducers } from 'redux'
import { reducer as reduxForm } from 'redux-form'
import authReducer from './authReducer'
import bungieReducer from './bungieReducer'
import bungieGroupReducer from './bungeGroupReducer'

export default combineReducers({
  bungie: bungieReducer,
  bungieGroup: bungieGroupReducer,
  auth: authReducer,
  form: reduxForm
})
