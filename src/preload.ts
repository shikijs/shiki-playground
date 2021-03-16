import { BUNDLED_LANGUAGES, BUNDLED_THEMES, Lang, Theme } from 'shiki'

/**
 * - First paint: load JS with GH Dark/Light theme
 * - Then: Load `preloaded` theme/lang in the background
 * - For all other theme/lang, only load when clicked
 */

export const preloadedThemes: Theme[] = ['github-light', 'github-dark']
export const preloadedLangs: Lang[] = ['javascript']

export const asyncLangsToLoad: Lang[] = ['tsx', 'c', 'go', 'html', 'css', 'python', 'ruby', 'java']
