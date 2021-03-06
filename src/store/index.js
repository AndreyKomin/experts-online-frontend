import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex);

export function createStore () {
  return new Vuex.Store({
    state: {
      itemsPerPage: 10,
      users: [],
      user: {},
      me: {
        avatar: "",
        info: "",
        messengers: "",
      },
      token: "",
      searchQuery: "",
      userToShow: {},
    },
    actions,
    mutations,
    getters
  })
}
