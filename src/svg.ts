export const unitLen = 24
export const stepX = unitLen * Math.cos(Math.PI / 6)
export const stepY = unitLen

const svgNS = 'http://www.w3.org/2000/svg'
export function createSVGElement(name, attrs) {
  const el = document.createElementNS(svgNS, name)
  for (let key in attrs) {
    el.setAttributeNS(null, key, attrs[key].toString())
  }
  return el
}

export function drawText(htmlContent, attrs, fontSize) {
  const text = createSVGElement('text', attrs)
  text.innerHTML = htmlContent
  text.style.fontSize = `${fontSize}px`
  return text
}