import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {path: '/', component: require('./components/Home.vue')},
  {path: '/login', component: require('./components/Login.vue')},
  {path: '/admin', component: require('./components/Admin.vue')},
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
