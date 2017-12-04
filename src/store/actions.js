import {
  auth,
  oauth,
  fetchToken,
  fetchMe,
  fetchUser,
  fetchUsers,
  updateMe,
} from '../api'

export default {

  FETCH_TOKEN: ({ commit }) => {
    return fetchToken()
      .then(token => commit('SET_TOKEN', { token }))
      .catch(() => {})
  },

  FETCH_AUTH: ({ commit }, { login, messenger_id, code }) => {
    return auth(login, messenger_id, code).then(token => commit('SET_AUTH', { token }))
  },

  OAUTH: ({ commit }, { provider, oauthService }) => {
    return oauth(provider, oauthService).then(res => commit('SET_AUTH', { token: res.data.token }));
  },

  FETCH_ME: ({ commit, state }) => {
    return fetchMe(state.token)
      .then(me => commit('SET_ME', { me }))
      .catch(() => {})
  },

  FETCH_USERS: ({ commit }) => {
    return fetchUsers().then(users => commit('SET_USERS', { users }))
  },

  FETCH_USER: ({ commit }, { id }) => {
    return fetchUser(id).then(user => commit('SET_USER', { id, user }))
  },

  UPDATE_ME: ({ state }, { ...data }) => {
    console.log(data);
    return updateMe(state.token, data)
  },

  UPDATE_AVATAR: ({ commit }, { avatar }) => {
    return commit('SET_AVATAR', { avatar })
  },
}
