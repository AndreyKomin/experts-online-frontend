import Vue from 'vue'

export default {

  SET_USERS: (state, { users }) => {
    state.users = users
  },

  SET_USER: (state, { id, user }) => {
    Vue.set(state.users, id, user || false) /* false means user not found */
  }
}
