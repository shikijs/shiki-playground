import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'

interface State {
  theme: string
  previewTheme: string
  lang: string
  code: string
}
const store = createStore<State>({
  state() {
    return {
      theme: 'github-light',
      previewTheme: 'github-light',
      lang: 'javascript',
      code: ''
    }
  },
  mutations: {
    changeTheme(state, t) {
      state.theme = t
    },
    changePreviewTheme(state, t) {
      state.previewTheme = t
    },
    changeLang(state, l) {
      state.lang = l
    },
    changeCode(state, c) {
      state.code = c
    }
  }
})

createApp(App).use(store).mount('#app')
