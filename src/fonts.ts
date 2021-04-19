export const defaultFont = 'IBM Plex Mono'
export const defaultFontSize = 12

interface GoogleFontSource {
  name: string
}
interface OtherFontSource {
  name: string
  cssUrl: string
}

export const fontSources: (GoogleFontSource | OtherFontSource)[] = [
  { name: 'IBM Plex Mono' },
  { name: 'Roboto Mono' },
  { name: 'SF Mono', cssUrl: 'https://fonts.cdnfonts.com/css/sf-mono' },
  {
    name: 'Hack',
    cssUrl: 'https://cdn.jsdelivr.net/npm/hack-font@3/build/web/hack.css'
  },
  { name: 'Fira Code' },
  { name: 'JetBrains Mono' },
  { name: 'Source Code Pro' },
  { name: 'Space Mono' },
  {
    name: 'DejaVu Sans Mono',
    cssUrl: 'https://fontlibrary.org//face/dejavu-sans-mono'
  }
]

export const fontSizes = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

export function getGoogleFontSourceCSSUrl(fontName: string) {
  const escapedFontName = fontName.split(' ').join('+')
  return `https://fonts.googleapis.com/css2?family=${escapedFontName}:ital,wght@0,400;0,700;1,400;1,700&display=swap`
}

function setCSSVariable(name: string, value: string) {
  document.documentElement.style.setProperty(name, value)
}
export function setFont(font: string) {
  setCSSVariable('--mono-font', `'${font}', '${defaultFont}', monospace`)
}
export function setFontSize(fs: number) {
  setCSSVariable('--mono-font-size', fs.toString() + 'px')
}
