export default {
  namespaced: true,
  state: {
    loading: false,
    error: null
  },
  getters: {
    loading: state => state.loading
  },
  actions: {
    exampleAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("EXAMPLE_INIT");
        this.$http.example
          .get(payload.test)
          .then(response => {
            if (response.status) {
              commit("EXAMPLE_SUCCESS", response.result);
            } else {
              commit("EXAMPLE_ERROR", response.result);
            }
            resolve(response);
          })
          .catch(error => {
            commit("EXAMPLE_ERROR", error);
            reject(error);
          });
      });
    }
  },
  mutations: {
    EXAMPLE_INIT: state => {
      state.loading = true;
    }
  }
};
