import {
  fetchUser,
  fetchUsers,
} from '../api'

export default {

  FETCH_USERS: ({ commit, state }) => {
    return fetchUsers().then(users => commit('SET_USERS', { users }))
  },

  FETCH_USER: ({ commit, state }, { id }) => {
    return fetchUser(id).then(user => commit('SET_USER', { id, user }))
  }
}
