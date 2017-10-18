import { FETCH_GROUP } from '../actions/types'

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_GROUP:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
