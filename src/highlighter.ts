import * as shiki from 'shiki'

shiki.setOnigasmWASM('/shiki/onigasm.wasm')
shiki.setCDN('/shiki/')

let highlighter: shiki.Highlighter

export async function getHighlighter() {
  if (highlighter) return highlighter

  highlighter = await shiki.getHighlighter({ themes: shiki.BUNDLED_THEMES })
  highlighter.loadTheme
  return highlighter
}