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
    state.me.avatar = me.avatar;
    state.me.messengers = me.messengers;
    const info = { ...me };
    delete info.avatar;
    delete info.messengers;
    state.me.info = info;
  },

  SET_MESSENGER: (state, { code, data }) => {
    const messengers = state.me.messengers;
    Vue.set(messengers, code, data);
    state.me.messengers = messengers;
  },

  UNSET_MESSENGER: (state, { code }) => {
    const messengers = state.me.messengers;
    Vue.delete(messengers, code)
    state.me.messengers = messengers;
  },

  SET_AVATAR: (state, { avatar }) => {
    state.me.avatar = avatar;
  },

  SET_SEARCH: (state, { searchQuery }) => {
    state.searchQuery = searchQuery;
  },

  SET_USERS: (state, { users }) => {
    state.users = users;
  },

  SET_USER: (state, { id, user }) => {
    state.user = user || false; /* false means user not found */
  }
}
