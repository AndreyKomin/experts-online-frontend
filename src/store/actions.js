import {
  auth,
  fetchToken,
  fetchMe,
  fetchUser,
  fetchUsers,
} from '../api'

export default {

  FETCH_TOKEN: ({ commit, dispatch, state }) => {
    return fetchToken()
      .then(token => commit('SET_TOKEN', { token }))
  },

  FETCH_AUTH: ({ commit }, { login, messenger_id }) => {
    return auth(login, messenger_id).then(token => commit('SET_AUTH', { token }))
  },

  FETCH_ME: ({ commit, state }) => {
    return fetchMe(state.token || localStorage['token']).then(me => commit('SET_ME', { me }))
  },

  FETCH_USERS: ({ commit, state }) => {
    return fetchUsers().then(users => commit('SET_USERS', { users }))
  },

  FETCH_USER: ({ commit, state }, { id }) => {
    return fetchUser(id).then(user => commit('SET_USER', { id, user }))
  }
}
