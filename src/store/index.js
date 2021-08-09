import example from "./example";

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default {
  modules: {
    example: example
  }
};
