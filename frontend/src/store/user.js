export default {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null, // Parse user object from localStorage
  }),
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    fetchUser({ commit }, user) {
      localStorage.setItem('user', JSON.stringify(user)); // Stringify user object and store in localStorage
      commit("setUser", user);
    },
  },
  getters: {
    user: (state) => state.user,
  },
};
