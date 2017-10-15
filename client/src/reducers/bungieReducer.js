import { FETCH_PLAYER, FETCH_GROUP } from '../actions/types'

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_PLAYER:
      return { ...state, ...action.payload }
    case FETCH_GROUP:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
