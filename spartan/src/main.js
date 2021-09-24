import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/fontawesome";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false;

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000',
}))

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
