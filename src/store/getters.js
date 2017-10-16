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
    return user
  }
}
