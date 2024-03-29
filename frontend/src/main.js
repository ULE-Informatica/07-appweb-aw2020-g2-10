import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import vuetify from "./plugins/vuetify";
import { sync } from "vuex-router-sync";
import Vuex from "vuex";

Vue.use(Vuex);
sync(store, router);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
