import { createApp } from 'vue'
import App from './App.vue'
import { initHighlighter } from './highlighter'
import { store } from './store'

initHighlighter().then(() => {
  createApp(App).use(store).mount('#app')
})