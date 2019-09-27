import Vue from "vue";
import App from "./App.vue";
import './plugins/element.js'


Vue.config.productionTip = false;

/**
 * Style Files
 */
import "./assets/scss/main.scss";

new Vue({
  render: h => h(App)
}).$mount("#app");
