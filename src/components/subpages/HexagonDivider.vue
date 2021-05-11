<template>
  <svg viewBox="-320 -32 640 64" xmlns="http://www.w3.org/2000/svg" ref="p1-svg"></svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { stepX, stepY, createSVGElement } from '../../svg'

export default defineComponent({
  props: ['color'],
  mounted() {
    const svgEl = this.$refs['p1-svg'] as SVGSVGElement
    svgEl.append(drawHexagon([0, 0], this.color))
  }
})

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
    transform: `translate(${-1 * stepX}, 0)`
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
</script>

<style scoped>
svg {
  margin-top: 2rem;
}
</style>