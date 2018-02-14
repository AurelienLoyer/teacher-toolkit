import Vue from 'vue'
import VueResource from 'vue-resource'
import VueSocketio from 'vue-socket.io';

import App from './App.vue'
import Router from './Router'
import env from 'env'

Vue.use(VueSocketio, env.socket_url);
Vue.use(VueResource)

new Vue({
  el: '#app',
  router: Router,
  render: h => h(App)
})
