import Home from './pages/Home.vue'
import Play from './pages/Play.vue'
import * as VueRouter from 'vue-router'

const routes = [
  { path: '/', component: Home },
  { path: '/play', component: Play }
]

export const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes
})
