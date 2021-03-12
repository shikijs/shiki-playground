import { BUNDLED_LANGUAGES, BUNDLED_THEMES, Lang, Theme } from 'shiki'

const preloadedThemes: Theme[] = ['github-light', 'github-dark']

export const allThemes = BUNDLED_THEMES.map((t) => {
  return {
    theme: t as Theme,
    loaded: preloadedThemes.includes(t as Theme)
  }
})

const preloadedLangs: Lang[] = ['javascript', 'tsx', 'python', 'java', 'php']

export const allLangs = BUNDLED_LANGUAGES.map((l) => {
  return {
    lang: l.id as Lang,
    loaded: preloadedLangs.includes(l.id as Lang)
  }
})
