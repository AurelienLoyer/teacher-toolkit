import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import Router from './Router'
import VueSocketio from 'vue-socket.io';
import env from 'env'

Vue.use(VueSocketio, env.socket_url);
Vue.use(VueResource)

new Vue({
  el: '#app',
  router: Router,
  render: h => h(App)
})
