import { IShikiTheme } from 'shiki'

export function setRootCSSVariable(name: string, value: string) {
  document.documentElement.style.setProperty(name, value)
}
export function setBodyCSSVariable(name: string, value: string) {
  document.body.style.setProperty(name, value)
}

interface WorkspaceColors {
  mainColors: string[]
  activeFg: string
  activeBg: string
  focusBg: string
  focusFg: string
  hoverBg: string
  hoverFg: string
  border: string
  sidebarBg: string
  sidebarFg: string
  tabBg: string
  tabFg: string
}

export function setThemeVariables(fg: string, bg: string, themeColors: WorkspaceColors) {
  setBodyCSSVariable('--foreground', fg)
  setBodyCSSVariable('--background', bg)
  setBodyCSSVariable('--focus-background', themeColors.focusBg)
  setBodyCSSVariable('--focus-foreground', themeColors.focusFg)
  setBodyCSSVariable('--hover-background', themeColors.hoverBg)
  setBodyCSSVariable('--hover-foreground', themeColors.hoverFg)
  setBodyCSSVariable('--active-selection-foreground', themeColors.activeFg)
  setBodyCSSVariable('--active-selection-background', themeColors.activeBg)
  setBodyCSSVariable('--sidebar-bg', themeColors.sidebarBg)
  setBodyCSSVariable('--sidebar-fg', themeColors.sidebarFg)
  setBodyCSSVariable('--tab-bg', themeColors.tabBg)
  setBodyCSSVariable('--tab-fg', themeColors.tabFg)
  setBodyCSSVariable('--border', `1px solid ${themeColors.border}`)
}

const darkDefaults: any = {
  'list.activeSelectionBackground': '#094771',
  'list.activeSelectionForeground': '#fff',
  'list.hoverBackground': '#2A2D2E',
  'editorWhitespace.foreground': '#e3e4e229',
  'editorIndentGuide.background': '#e3e4e229',
  'editorIndentGuide.activeBackground': '#e3e4e229',
  'sideBar.background': '#252526'
}
const lightDefaults: any = {
  'list.activeSelectionBackground': '#0060C0',
  'list.activeSelectionForeground': '#fff',
  'list.hoverBackground': '#F0F0F0',
  'editorWhitespace.foreground': '#33333333',
  'editorIndentGuide.background': '#33333333',
  'editorIndentGuide.activeBackground': '#33333333',
  'sideBar.background': '#F3F3F3'
}

export function extractColors(t: IShikiTheme): WorkspaceColors {
  const primaryTypes = [
    'constant',
    'entity',
    'keyword',
    'markup',
    'meta',
    'comment',
    'invalid',
    'punctuation',
    'storage',
    'string',
    'support',
    'variable'
  ]

  const colors = new Set<string>()

  primaryTypes.map(ttype => {
    const targetSetting = t.settings.find(s => s.scope === ttype || s.scope?.includes(ttype))
    if (targetSetting && targetSetting.settings.foreground) {
      colors.add(targetSetting.settings.foreground)
    }
  })

  if (colors.size < 6) {
    t.settings.forEach(s => {
      if (s.settings.foreground) {
        colors.add(s.settings.foreground)
      }
    })
  }

  const result: { [key: string]: any } = {
    mainColors: Array.from(colors).slice(0, 6)
  }

  const colorMapping: { [key: string]: any } = {
    activeFg: 'list.activeSelectionForeground',
    activeBg: 'list.activeSelectionBackground',
    focusBg: 'list.focusBackground',
    focusFg: 'list.focusForeground',
    hoverBg: 'list.hoverBackground',
    hoverFg: 'list.hoverForeground',
    border: 'editorIndentGuide.activeBackground',
    sidebarBg: 'sideBar.background',
    sidebarFg: 'sideBar.foreground',
    tabFg: 'tab.activeForeground',
    tabBg: 'editorGroupHeader.tabsBackground'
  }

  for (let key in colorMapping) {
    const vscodeKeyName = colorMapping[key]
    if (t.colors && vscodeKeyName in t.colors) {
      result[key] = t.colors[vscodeKeyName]
    } else if ((t as any).type === 'light' && vscodeKeyName in lightDefaults) {
      result[key] = lightDefaults[vscodeKeyName]
    } else if ((t as any).type === 'dark' && vscodeKeyName in lightDefaults) {
      result[key] = darkDefaults[vscodeKeyName]
    }
  }

  return result as WorkspaceColors
}
