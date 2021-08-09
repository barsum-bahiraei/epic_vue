import Vue from "vue";

Vue.config.productionTip = false;

import i18n from "./plugins/i18n";

import router from "./plugins/vue-router";
import store from "./plugins/vuex";

// add styles
require("./styles/index.scss");

// add font
require("./assets/fonts/b-yekan/styles.css");

import App from "./App.vue";

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount("#app");
