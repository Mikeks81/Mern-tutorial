import { FETCH_PLAYER, FETCH_GEAR } from '../actions/types'

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_PLAYER:
      return { ...state, ...action.payload }
    case FETCH_GEAR:
      console.log('GEAR PAYLOAD ', action.payload, 'STATE ', state)
      return { ...state, gear: action.payload }
    default:
      return state
  }
}
