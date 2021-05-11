<template>
  <hexagon-divider :color="color" />

  <div>
    <p>All 123 languages supported by Shiki:</p>
    <p>{{ languages }}</p>
    <p :style="{ color }">Try it in the <a :style="{ color }" target="_blank" href="/play">playground</a></p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HexagonDivider from './HexagonDivider.vue'
import SvgComparison from './SvgComparison.vue'
import { BUNDLED_LANGUAGES } from 'shiki'

export default defineComponent({
  data() {
    return {
      color: '#D92626',
      languages: BUNDLED_LANGUAGES.map(l => l.id).join(' | ')
    }
  },
  components: {
    HexagonDivider,
    SvgComparison
  }
})
</script>