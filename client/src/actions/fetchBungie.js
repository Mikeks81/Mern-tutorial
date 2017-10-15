import axios from 'axios'
import { FETCH_PLAYER, FETCH_GROUP } from './types'

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
  instanceHash,
  callback
) => async dispatch => {
  const res = await axios.get(
    `/api/itemInstance/${membershipId}/${instanceHash}`
  )

  typeof callback === 'function' && callback(res)

  return res
}

export const fetchUserGroup = playerName => async dispatch => {
  console.log('fetching group', playerName)
  const res = await axios.get(`/api/get_user_group/${playerName}`)

  dispatch({ type: FETCH_GROUP, payload: res.data })
}
