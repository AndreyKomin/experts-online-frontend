import Vue from 'vue'

export default {

  SET_AUTH: (state, { token }) => {
    state.token = token;
    localStorage.setItem('token', token);
  },

  SET_TOKEN: (state, { token }) => {
    state.token = token;
  },

  SET_ME: (state, { me }) => {
    state.me = me;
  },

  SET_AVATAR: (state, { avatar }) => {
    state.me.avatar = avatar;
  },

  SET_USERS: (state, { users }) => {
    state.users = users;
  },

  SET_USER: (state, { id, user }) => {
    state.user = user || false; /* false means user not found */
  }
}