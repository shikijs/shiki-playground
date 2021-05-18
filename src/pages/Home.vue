<template>
  <div id="home-container">
    <canvas-grid />

    <logo-svg />

    <div class="pages">
      <p1 :color="colors[0]" />
    </div>

    <div class="pages">
      <p2 :color="colors[1]" />
    </div>

    <div class="pages">
      <p3 :color="colors[2]" />
    </div>

    <div class="pages">
      <p4 :color="colors[3]" />
    </div>

    <!-- <div class="pages">
      <p5 :color="colors[4]" />
    </div>

    <div class="pages">
      <p6 :color="colors[5]" />
    </div> -->
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import CanvasGrid from '../components/CanvasGrid.vue'
import LogoSvg from '../components/LogoSvg.vue'
import P1 from '../components/subpages/P1.vue'
import P2 from '../components/subpages/P2.vue'
import P3 from '../components/subpages/P3.vue'
import P4 from '../components/subpages/P4.vue'
import P5 from '../components/subpages/P5.vue'
import P6 from '../components/subpages/P6.vue'

const colors = ['#E6611A', '#D92626', '#26D9B9', '#5E40BF', '#E5F20D', '#491AE6']

export default defineComponent({
  components: {
    CanvasGrid,
    LogoSvg,
    P1,
    P2,
    P3,
    P4,
    P5,
    P6
  },
  data() {
    return {
      colors
    }
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