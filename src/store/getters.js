export default {
  // ids of the items that should be currently displayed based on
  // current list type and current pagination
  activeUsers (state) {
    const { itemsPerPage, users } = state;

    const page = Number(state.route.params.page) || 1;
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;

    return users.slice(start, end)
  },

  // items that should be currently displayed.
  // this Array may not be fully fetched.
  activeItems (state, getters) {
    return getters.activeUsers
  },

  activeUser (state, getters) {
    const { user } = state;
    return { ...user }
  },

  myInfo (state, getters) {
    const { me } = state;
    return { ...me.info }
  },

  myAvatar (state, getters) {
    const { me } = state;
    return me.avatar
  },

  myMessengers (state, getters) {
    const { me } = state;
    return { ...me.messengers }
  },

  myProgress (state, getters) {
    const { me } = state;

    const progress = {
      portfolio: 0,
      avatar: 0,
      contacts: 0,
    };

    if (me.info && me.info.portfolio && me.info.portfolio.length >= 50) {
      progress.portfolio = 30;
    }

    if (me.avatar && me.avatar.length > 0) {
      progress.avatar = 40;
    } else {
      progress.avatar = 0;
    }

    if(me.messengers){
      progress.contacts = 5 * Object.keys(me.messengers).length
    }

    return progress.portfolio + progress.avatar + progress.contacts;
  }
}
