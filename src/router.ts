import App from './App.vue'
import Play from './Play.vue'
import * as VueRouter from 'vue-router'

const routes = [
  { path: '/', component: App },
  { path: '/play', component: Play }
]

export const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes
})
