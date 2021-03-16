import { BUNDLED_LANGUAGES, BUNDLED_THEMES, Lang, Theme } from 'shiki'
import { createStore } from 'vuex'
import { highlighter } from './highlighter'
import { asyncLoadedLangs, preloadedLangs, preloadedThemes } from './preload'

export interface State {
  loadedThemes: Theme[]
  unloadedThemes: Theme[]
  loadedLangs: Lang[]
  unloadedLangs: Lang[]
  theme: string
  previewTheme: string
  lang: string
  code: string
  fgColor: string
  bgColor: string
}

export const store = createStore<State>({
  state() {
    return {
      loadedThemes: preloadedThemes,
      unloadedThemes: (BUNDLED_THEMES as Theme[]).filter(
        (t) => !preloadedThemes.includes(t as Theme)
      ),
      loadedLangs: preloadedLangs,
      unloadedLangs: BUNDLED_LANGUAGES.map((l) => l.id as Lang).filter(
        (l) => !preloadedLangs.includes(l as Lang)
      ),
      theme: '',
      previewTheme: '',
      lang: '',
      code: '',
      fgColor: '',
      bgColor: ''
    }
  },
  mutations: {
    loadTheme(state, theme) {
      if (!state.loadedThemes.includes(theme)) {
        state.loadedThemes.push(theme)
      }
      state.unloadedThemes = state.unloadedThemes.filter((t) => t !== theme)
    },
    pickTheme(state, t) {
      state.theme = t
      state.fgColor = highlighter.getForegroundColor(t)
      state.bgColor = highlighter.getBackgroundColor(t)
    },
    pickPreviewTheme(state, t) {
      state.previewTheme = t
      state.fgColor = highlighter.getForegroundColor(t)
      state.bgColor = highlighter.getBackgroundColor(t)
    },
    loadLang(state, lang) {
      if (!state.loadedLangs.includes(lang)) {
        state.loadedLangs.push(lang)
      }
      state.unloadedLangs = state.unloadedLangs.filter((l) => l !== lang)
    },
    changeLang(state, l) {
      state.lang = l
    },
    changeCode(state, c) {
      state.code = c
    }
  },
  actions: {
    async pickTheme(ctx, t) {
      ctx.commit('pickTheme', t)
    },
    async loadAndPickTheme(ctx, t) {
      await highlighter.loadTheme(t)
      ctx.commit('loadTheme', t)

      await ctx.dispatch('pickTheme', t)
    },
    async pickPreviewTheme(ctx, t) {
      if (t !== '') {
        await highlighter.loadTheme(t)
      }
      ctx.commit('pickPreviewTheme', t)
    },
    async loadLang(ctx, l) {
      await highlighter.loadLanguage(l)
      ctx.commit('loadLang', l)
    },
    async loadAndPickLang(ctx, l) {
      await ctx.dispatch('loadLang', l)
      ctx.commit('changeLang', l)
    }
  }
})
