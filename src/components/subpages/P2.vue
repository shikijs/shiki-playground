<template>
  <hexagon-divider :color="color" />

  <div>
    <p>All {{ languageIds.length }} languages supported by Shiki:</p>
    <p>{{ languageIds.join(' | ') }}</p>
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
      languageIds: BUNDLED_LANGUAGES.map(l => l.id)
    }
  },
  components: {
    HexagonDivider,
    SvgComparison
  }
})
</script>