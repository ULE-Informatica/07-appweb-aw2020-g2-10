import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    user: {},
    isUserLoggedIn: false
  },
  mutations: {
    setToken(st, token) {
      st.token = token;
      st.isUserLoggedIn = !!token;
    },
    setUser(st, user) {
      st.user = user;
    },
    updateUser(st, user) {
      st.user.name = user.name;
      st.user.email = user.email;
      st.user.avatar = user.avatar;
    },
    setIsUserLoggedIn(st, isUserLoggedIn) {
      st.isUserLoggedIn = isUserLoggedIn;
    }
  },
  actions: {
    setToken({ commit }, token) {
      commit("setToken", token);
    },
    setUser({ commit }, user) {
      commit("setUser", user);
    },
    updateUser({ commit }, user) {
      commit("updateUser", user);
    },
    setIsUserLoggedIn({ commit }, isUserLoggedIn) {
      commit("setIsUserLoggedIn", isUserLoggedIn);
    }
  },
  getters: {
    currentUser(st) {
      return st.user;
    },
    isAuthenticated(st) {
      return st.isUserLoggedIn;
    },
    getIsUserLoggedIn() {
      return this.isUserLoggedIn;
    }
  }
});
