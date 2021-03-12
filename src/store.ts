import { Lang, Theme } from 'shiki'
import { createStore } from 'vuex'
import { loadLang, loadTheme } from './highlighter'
import { allLangs, allThemes } from './preload'

export interface State {
  allThemes: { theme: Theme; loaded: boolean }[]
  allLangs: { lang: Lang; loaded: boolean }[]
  theme: string
  previewTheme: string
  lang: string
  code: string
}

export const store = createStore<State>({
  state() {
    return {
      allThemes,
      allLangs,
      theme: 'github-light',
      previewTheme: 'github-light',
      lang: 'javascript',
      code: ''
    }
  },
  mutations: {
    loadTheme(state, theme) {
      state.allThemes.find((t) => t.theme === theme)!.loaded = true
    },
    changeTheme(state, t) {
      state.theme = t
    },
    changePreviewTheme(state, t) {
      state.previewTheme = t
    },
    loadLang(state, lang) {
      state.allLangs.find((l) => l.lang === lang)!.loaded = true
    },
    changeLang(state, l) {
      state.lang = l
    },
    changeCode(state, c) {
      state.code = c
    }
  },
  actions: {
    async loadAndPickTheme(ctx, t) {
      await loadTheme(t)
      ctx.commit('loadTheme', t)
      ctx.commit('changeTheme', t)
    },
    async loadAndPickLang(ctx, l) {
      await loadLang(l)
      ctx.commit('loadLang', l)
      ctx.commit('changeLang', l)
    }
  }
})
