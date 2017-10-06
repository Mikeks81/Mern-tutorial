import axios from 'axios'
import { FETCH_PLAYER, FETCH_GEAR } from './types'

export const fetchPlayer = playerName => async dispatch => {
  const res = await axios.get(`/api/player`, {
    params: {
      player: playerName
    }
  })
  dispatch({ type: FETCH_PLAYER, payload: res.data })
}

export const fetchGearDetails = (
  membershipId,
  instanceHash
) => async dispatch => {
  const res = await axios.get(
    `/api/itemInstance/${membershipId}/${instanceHash}`
  )
  return res
}
