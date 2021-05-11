<template>
  <hexagon-divider :color="color" />

  <div>
    <p>All themes supported by Shiki:</p>
    <p>{{ languages }}</p>
    <p :style="{ color }">
      Try it in the <a :style="{ color }" target="_blank" href="/play">playground</a>
    </p>

    <hexagon-theme />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HexagonDivider from './HexagonDivider.vue'
import SvgComparison from './SvgComparison.vue'
import { BUNDLED_THEMES } from 'shiki'
import HexagonTheme from './HexagonTheme.vue'

export default defineComponent({
  data() {
    return {
      color: '#26D9B9',
      languages: BUNDLED_THEMES.map(t => t).join(' | ')
    }
  },
  components: {
    HexagonDivider,
    SvgComparison,
    HexagonTheme
  }
})
</script>,
    HexagonTheme