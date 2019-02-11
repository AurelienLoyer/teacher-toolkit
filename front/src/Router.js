import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Admin from './components/Admin.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/admin', component: Admin },
];

const router = new VueRouter({
  mode: 'hash',
  routes,
});

export default router;
