import { setOnigasmWASM, setCDN, Highlighter, getHighlighter } from 'shiki'
import { preloadedThemes, preloadedLangs } from './preload'

setOnigasmWASM('/shiki/onigasm.wasm')
setCDN('/shiki/')

export let highlighter: Highlighter

export async function initHighlighter() {
  highlighter = await getHighlighter({
    themes: preloadedThemes,
    langs: preloadedLangs
  })
}
