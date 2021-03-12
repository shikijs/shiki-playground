import {
  setOnigasmWASM,
  setCDN,
  Highlighter,
  getHighlighter as getShikiHighlighter,
  Theme,
  Lang
} from 'shiki'
import { allThemes, allLangs } from './preload'

setOnigasmWASM('/shiki/onigasm.wasm')
setCDN('/shiki/')

let highlighter: Highlighter

export async function getHighlighter() {
  if (highlighter) return highlighter

  highlighter = await getShikiHighlighter({
    themes: allThemes.filter((t) => t.loaded).map((t) => t.theme),
    langs: allLangs.filter((l) => l.loaded).map((l) => l.lang)
  })

  return highlighter
}

export async function loadTheme(t: Theme) {
  if (!highlighter) {
    await getHighlighter()
  }

  await highlighter.loadTheme(t)
}

export async function loadLang(l: Lang) {
  if (!highlighter) {
    await getHighlighter()
  }

  await highlighter.loadLanguage(l)
}
