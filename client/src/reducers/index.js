import { combineReducers } from 'redux'
import { reducer as reduxForm } from 'redux-form'
import authReducer from './authReducer'
import bungieReducer from './bungieReducer'
import bungieGroupReducer from './bungeGroupReducer'
import surveysReducer from './surveysReducer'

export default combineReducers({
  bungie: bungieReducer,
  bungieGroup: bungieGroupReducer,
  auth: authReducer,
  surveys: surveysReducer,
  form: reduxForm
})
