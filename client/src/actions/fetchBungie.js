import axios from 'axios'
import { FETCH_PLAYER, FETCH_GROUP } from './types'

export const fetchPlayer = playerName => async dispatch => {
  const res = await axios.get(`/api/player`, {
    params: {
      player: playerName
    }
  })

  return res.data
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
  const group = await axios.get(`/api/get_user_group/${playerName}`)

  const groupRoster = await axios.get(
    `/api/get_group_members/${group.data.results[0].group.groupId}`
  )

  const groupDetails = {
    groupDetails: { ...group.data },
    groupMembers: { ...groupRoster.data.Response }
  }

  dispatch({ type: FETCH_GROUP, payload: groupDetails })
}
