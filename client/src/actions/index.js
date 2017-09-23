import axios from 'axios'
import { FETCH_USER } from './types'
// this syntax is fucking confusing and i def don't think easier to read so i'm including a readable refactor of the function below
/*
+const fetchUser = () => {
 +  return dispatch => {
 +    axios
 +      .get('/api/current_user')
 +      .then(res => dispatch({ type: FETCH_USER, payload: res }))
 +  }
 +}
 */
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user')

  dispatch({ type: FETCH_USER, payload: res.data })
}

/*
export const handleToken = (token) => {
  return (dispatch) => {
    axios.post('/api/stripe', token).then(res => dispatch({type: , payload: }))
  }
}

*/
export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token)

  dispatch({ type: FETCH_USER, payload: res.data })
}
