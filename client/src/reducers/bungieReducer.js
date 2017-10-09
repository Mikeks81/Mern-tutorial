import { FETCH_PLAYER } from '../actions/types'

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_PLAYER:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
