<template>
  <canvas id="grid" ref="grid"></canvas>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { stepX, stepY } from '../svg'

export default defineComponent({
  mounted() {
    const ctx = this.$refs.grid.getContext('2d')
    resizeCanvasToScreen(ctx)
    draw(ctx)

    let sizeChanged = false
    window.onresize = () => {
      sizeChanged = true
    }

    function loop() {
      if (sizeChanged) {
        resizeCanvasToScreen(ctx)
        draw(ctx)
        sizeChanged = false
      }
      requestAnimationFrame(loop)
    }
    requestAnimationFrame(loop)
  }
})

function draw(ctx) {
  const width = document.documentElement.clientWidth
  const height = document.documentElement.clientHeight

  ctx.clearRect(0, 0, width, height)

  const center = {
    x: width / 2,
    y: height / 2
  }

  ctx.beginPath()
  ctx.arc(center.x, center.y, 5, 0, Math.PI * 2, true) // Outer circle
  ctx.strokeStyle = '#00ff00'
  ctx.stroke()
  ctx.closePath()

  ctx.strokeStyle = '#2f363d'

  for (let x = 0; x < width / 2; x += stepX) {
    drawLine(center.x - x, 0, center.x - x, height)
    // avoid overlap in middle
    if (x !== 0) {
      drawLine(center.x + x, 0, center.x + x, height)
    }
  }

  drawAngledLines(Math.PI / 6)
  drawAngledLines(Math.PI - Math.PI / 6)

  function drawAngledLines(angle) {
    for (let y = 0; y - Math.abs(Math.tan(angle)) * (width / 2) < height / 2; y += stepY) {
      const x1 = width
      const y1 = y + center.y + Math.tan(angle) * (width / 2)
      const x2 = 0
      const y2 = y + center.y - Math.tan(angle) * (width / 2)

      drawLine(x1, y1, x2, y2)
      // avoid overlap in middle
      if (y !== 0) {
        drawLine(x2, height - y1, x1, height - y2)
      }
    }
  }

  function drawLine(x, y, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x2, y2)
    ctx.closePath()
    ctx.stroke()
  }
}

function resizeCanvasToScreen(ctx) {
  const width = document.documentElement.clientWidth
  const height = document.documentElement.clientHeight

  ctx.canvas.width = width
  ctx.canvas.height = height
}
</script>

<style>
#grid {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  animation: 0.9s ease-in-out breath;
}
@keyframes breath {
  from {
    opacity: 0.35;
  }
  to {
    opacity: 0.85;
  }
}
</style>