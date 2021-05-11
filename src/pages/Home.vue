<template>
  <div id="home-container">
    <canvas-grid />

    <logo-svg />

    <div class="pages">
      <p1 />
    </div>

    <div class="pages">
      <p2 />
    </div>

    <div class="pages">
      <p3 />
    </div>

    <div class="pages">
      <p>Comparison</p>
    </div>
    <div class="pages">
      <p>Extensibility</p>
    </div>
    <div class="pages">
      <p>Export</p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import CanvasGrid from '../components/CanvasGrid.vue'
import LogoSvg from '../components/LogoSvg.vue'
import P1 from '../components/subpages/P1.vue'
import P2 from '../components/subpages/P2.vue'
import P3 from '../components/subpages/P3.vue'

export default defineComponent({
  components: {
    CanvasGrid,
    LogoSvg,
    P1,
    P2,
    P3
  },
  async mounted() {
    if (window.__theme === 'dark') {
      await this.$store.dispatch('loadAndChangeTheme', 'github-dark')
    } else {
      await this.$store.dispatch('loadAndChangeTheme', 'github-light')
    }
  }
})
</script>

<style>
#home-container {
  display: flex;
  flex-flow: column nowrap;
  overflow-y: hidden;
}
.pages {
  width: 640px;
  align-self: center;

  display: flex;
  flex-flow: column nowrap;
}
</style>