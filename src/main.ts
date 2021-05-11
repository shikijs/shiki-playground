import * as Vue from 'vue'
import { initHighlighter } from './highlighter'
import { router } from './router'
import { store } from './store'
import Home from './App.vue'

initHighlighter().then(() => {
  const app = Vue.createApp(Home)
  app.use(store)
  app.use(router)
  app.mount('#app')
})
