import Vue from 'vue';
import VueResource from 'vue-resource';
import VueSocketIO from 'vue-socket.io';

import App from './App.vue';
import router from './router';

Vue.use(new VueSocketIO({
  debug: false,
  connection: process.env.VUE_APP_SOCKET_URL,
}));

Vue.use(VueResource);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
