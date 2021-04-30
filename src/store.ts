import { BUNDLED_LANGUAGES, BUNDLED_THEMES, Lang, Theme } from 'shiki'
import { createStore } from 'vuex'
import {
  fontSources,
  setFont,
  getGoogleFontSourceCSSUrl,
  defaultFontSize,
  defaultFont,
  setFontSize
} from './fonts'
import { highlighter } from './highlighter'
import { preloadedLangs, preloadedThemes } from './preload'

export interface State {
  loadedThemes: Theme[]
  unloadedThemes: Theme[]
  loadedLangs: Lang[]
  unloadedLangs: Lang[]
  theme: string
  previewTheme: string
  lang: string
  previewLang: string
  code: string
  fgColor: string
  bgColor: string
  font: string
  fontSize: number
}

export const createPlaygroundStore = (defaults: Partial<State>) => {
  const store = createStore<State>({
    state() {
      return {
        loadedThemes: preloadedThemes,
        unloadedThemes: (BUNDLED_THEMES as Theme[]).filter(
          t => !preloadedThemes.includes(t as Theme)
        ),
        loadedLangs: preloadedLangs,
        unloadedLangs: BUNDLED_LANGUAGES.map(l => l.id as Lang).filter(
          l => !preloadedLangs.includes(l as Lang)
        ),
        theme: '',
        previewTheme: '',
        lang: '',
        previewLang: '',
        code: '',
        fgColor: '',
        bgColor: '',
        font: defaultFont,
        fontSize: defaultFontSize,
        ...defaults
      }
    },
    mutations: {
      loadTheme(state, theme) {
        if (!state.loadedThemes.includes(theme)) {
          state.loadedThemes.push(theme)
        }
        state.unloadedThemes = state.unloadedThemes.filter(t => t !== theme)
      },
      changeTheme(state, t) {
        state.theme = t
        state.fgColor = highlighter.getForegroundColor(t)
        state.bgColor = highlighter.getBackgroundColor(t)
      },
      changePreviewTheme(state, t) {
        state.previewTheme = t
        state.fgColor = highlighter.getForegroundColor(t)
        state.bgColor = highlighter.getBackgroundColor(t)
      },
      loadLang(state, lang) {
        if (!state.loadedLangs.includes(lang)) {
          state.loadedLangs.push(lang)
        }
        state.unloadedLangs = state.unloadedLangs.filter(l => l !== lang)
      },
      changeLang(state, l) {
        state.lang = l
      },
      changePreviewLang(state, l) {
        state.previewLang = l
      },
      changeCode(state, c) {
        state.code = c
      },
      changeFont(state, font) {
        state.font = font
      },
      changeFontSize(state, fs) {
        state.fontSize = fs
      }
    },
    actions: {
      async changeTheme(ctx, t) {
        ctx.commit('changeTheme', t)
      },
      async loadAndChangeTheme(ctx, t) {
        await highlighter.loadTheme(t)
        ctx.commit('loadTheme', t)

        await ctx.dispatch('changeTheme', t)
      },
      async changePreviewTheme(ctx, t) {
        if (t !== '') {
          await highlighter.loadTheme(t)
        }
        ctx.commit('changePreviewTheme', t)
      },
      async changeLang(ctx, langId) {
        console.log("lang")
        const samplePath = getLangSamplePath(langId)

        if (samplePath) {
          const res = await fetch(`/shiki/samples/${samplePath}`)
          const text = await res.text()
          ctx.commit('changeCode', text)
        } else if(ctx.state.code === '') {
          ctx.commit('changeCode', '// type your code')
        }
        ctx.commit('changeLang', langId)
      },
      async loadLang(ctx, l) {
        await highlighter.loadLanguage(l)
        ctx.commit('loadLang', l)
      },
      async loadAndChangeLang(ctx, l) {
        await ctx.dispatch('loadLang', l)
        await ctx.dispatch('changeLang', l)
      },
      async changePreviewLang(ctx, l) {
        if (l !== '') {
          await highlighter.loadLanguage(l)

          const samplePath = getLangSamplePath(l)

          if (samplePath) {
            const res = await fetch(`/shiki/samples/${samplePath}`)
            const text = await res.text()
            ctx.commit('changeCode', text)
          } else {
            ctx.commit('changeCode', '// type your code')
          }
        } else {
          const samplePath = getLangSamplePath(ctx.state.lang as Lang)

          if (samplePath) {
            const res = await fetch(`/shiki/samples/${samplePath}`)
            const text = await res.text()
            ctx.commit('changeCode', text)
          } else {
            ctx.commit('changeCode', '// type your code')
          }
        }
        ctx.commit('changePreviewLang', l)
      },
      async changeFont(ctx, font) {
        const matchingFontSource = fontSources.find(fs => fs.name === font)
        if (matchingFontSource) {
          const link = document.createElement('link')

          link.href =
            'cssUrl' in matchingFontSource
              ? matchingFontSource.cssUrl
              : getGoogleFontSourceCSSUrl(matchingFontSource.name)
          link.rel = 'stylesheet'
          link.type = 'text/css'

          link.onload = () => {
            setFont(font)
            ctx.commit('changeFont', font)
          }

          document.body.appendChild(link)
        }
      },
      async changeFontSize(ctx, fs) {
        setFontSize(fs)
        ctx.commit('changeFontSize', fs)
      }
    }
  })

  if (defaults.theme) {
    store.dispatch('loadAndChangeTheme', defaults.theme)
  }
  if (defaults.lang) {
    store.dispatch('loadAndChangeLang', defaults.lang)
  }
  console.log(defaults)
  console.log(store.state)
  return store
}

function getLangSamplePath(langId: Lang) {
  const langRegistration = BUNDLED_LANGUAGES.filter(l => l.id === langId)[0]

  return langRegistration?.samplePath
}
