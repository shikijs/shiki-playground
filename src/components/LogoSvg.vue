<template>
  <div id="logo-svg-container">
    <svg
      id="logo-svg"
      ref="logo-svg"
      viewBox="-320 -384 640 768"
      xmlns="http://www.w3.org/2000/svg"
    ></svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { unitLen, stepX, stepY, createSVGElement, drawText } from '../svg'

const polygons = [
  [[0, -1], [-4, -3], '#E6611A'],
  [[0, -1], [4, 1], '#D92626'],
  [[-4, -3], [0, -5], '#26D9B9'],
  [[4, 1], [0, 3], '#5E40BF'],
  [[0, -5], [4, -3], '#E5F20D'],
  [[0, 3], [-4, 1], '#491AE6']
]
const unitDelay = 300

export default defineComponent({
  mounted() {
    const svgEl = this.$refs['logo-svg'] as SVGSVGElement
    polygons.forEach((p, i) => {
      svgEl.append(drawPolygonWithAnimation(...p, Math.floor(i / 2) * unitDelay))
    })

    svgEl.append(drawHexagons())

    svgEl.append(drawTexts())
  }
})

function drawTexts() {
  const g = createSVGElement('g', {})

  // text, stepY multiplier, fontSize
  const texts = [
    ['shiki', -12, 2],
    ['beautiful & modern', -8, 1],
    ['syntax highlighter', -6.6, 1]
  ]

  texts.forEach((t, i) => {
    g.append(
      drawText(
        t[0],
        {
          x: 0,
          y: stepY * t[1],
          class: 'mono'
        },
        unitLen * t[2]
      )
    )
  })

  return g
}

function drawHexagons() {
  const hexagonTexts = [
    'high fidelity highlighting',
    '200+ languages',
    '4000+ VS Code themes',
    'simple & extensible',
    'designer friendly',
    'mature ecosystem'
  ]

  const firstHexagonPos = [0, -stepY]
  const fills = polygons.map(p => p[2])
  const g = createSVGElement('g', {
    transform: `translate(${-8 * stepX}, 0)`
  })

  for (let i = 0; i < 6; i++) {
    g.append(drawHexagon([firstHexagonPos[0], firstHexagonPos[1] + i * 3 * stepY], fills[i]))
    g.append(
      drawText(
        hexagonTexts[i],
        {
          x: 0,
          y: firstHexagonPos[1] + (i * 3 - 0.5) * stepY,
          class: 'mono'
        },
        unitLen
      )
    )
  }

  return g
}

function drawHexagon(center, fill) {
  const sixPoints = [
    [center[0], center[1] - stepY],
    [center[0] - stepX, center[1] - stepY / 2],
    [center[0] - stepX, center[1] + stepY / 2],
    [center[0], center[1] + stepY],
    [center[0] + stepX, center[1] + stepY / 2],
    [center[0] + stepX, center[1] - stepY / 2]
  ]

  const g = createSVGElement('g', {
    transform: `translate(${-2 * stepX}, 0)`
  })

  sixPoints.forEach((p, i) => {
    const polygon = createSVGElement('polygon', {
      fill,
      points: `${center[0]},${center[1]} ${sixPoints[i][0]},${sixPoints[i][1]} ${
        sixPoints[(i + 1) % 6][0]
      },${sixPoints[(i + 1) % 6][1]}`,
      stroke: fill
    })
    g.append(polygon)
  })
  return g
}

/**
 * Each point specify steps
 * For example, [1, 2] => [stepX, stepY * 2]
 */
const offsetX = -10 * stepX
const offsetY = -9 * stepY
function drawPolygonWithAnimation(
  p1r: [number, number],
  // p2r: [number, number],
  // p3r: [number, number],
  p4r: [number, number],
  fill: string,
  delay: number
) {
  const p2r = [p1r[0], p1r[1] + 2]
  const p3r = [p4r[0], p4r[1] + 2]
  const p1 = [p1r[0] * stepX + offsetX, p1r[1] * stepY + offsetY]
  const p2 = [p2r[0] * stepX + offsetX, p2r[1] * stepY + offsetY]
  const p3 = [p3r[0] * stepX + offsetX, p3r[1] * stepY + offsetY]
  const p4 = [p4r[0] * stepX + offsetX, p4r[1] * stepY + offsetY]
  const beginPoints = `${p1[0]},${p1[1]} ${p2[0]},${p2[1]} ${p2[0]},${p2[1]} ${p1[0]},${p1[1]}`
  const endPoints = `${p1[0]},${p1[1]} ${p2[0]},${p2[1]} ${p3[0]},${p3[1]} ${p4[0]},${p4[1]}`

  return createAnimatedPolygon(beginPoints, endPoints, delay, unitDelay, fill)
}

function createAnimatedPolygon(beginPoints, endPoints, delay, dur, fill) {
  const polygon = createSVGElement('polygon', {
    fill,
    points: beginPoints
  })

  polygon.innerHTML = `<animate
      attributeName="points"
      dur="${dur}ms"
      fill="freeze"
      begin="${delay}ms"
      to="${endPoints}"
      calcMode="spline"
      keySplines=".42 0 1 1"
      keyTimes="0; 1"
    />
    <animate
      attributeName="stroke"
      fill="freeze"
      begin="${delay}ms"
      dur="0.01"
      to="#24292e"
    />
    `

  return polygon
}
</script>

<style>
#logo-svg-container {
  height: calc(100vh - 100px);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
#logo-svg {
  width: 640px;
  height: 768px;
}
.mono {
  fill: var(--foreground);
  font-family: var(--mono-font);
  dominant-baseline: hanging;
}
</style>