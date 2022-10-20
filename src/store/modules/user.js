export default {
  namespaced: true,
  state: {},
  mutations: {
    updateUser (state, user = {}) {
      Object.assign(state, { ...user })
    }
  }
}
