// From https://stackoverflow.com/a/12034334
const entityMap: { [k: string]: string } = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
}

export function escapeHtml(str: string) {
  return String(str).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s]
  })
}
