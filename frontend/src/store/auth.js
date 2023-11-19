import axios from "axios";

export default {
  state: () => ({
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
  }),
  mutations: {
    setAuthenticated(state, value) {
      state.isAuthenticated = value;
    },
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    setAuthError(state, error) {
      state.authError = error;
    },
  },
  actions: {
    async login({ commit, state }, payload) {
      commit("setAuthenticated", true);
      commit("setUser", payload.user);
      commit("setToken", payload.token);

      if (state.token) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${state.token}`;
      }

      console.log('state.token: ', state.token)
      console.log('payload.token: ', payload.token)

      // Save to local storage
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("user", JSON.stringify(payload.user));
      localStorage.setItem("token", payload.token);
    },
    logout({ commit }) {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      commit("setAuthenticated", false);
      commit("setUser", null);
      commit("setToken", null);
    },
  },
  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
    getUser: (state) => state.user, // Added getter for user
    getToken: (state) => state.token, // Added getter for token
    getAuthError: (state) => state.authError, // Added getter for auth error
  },
};
