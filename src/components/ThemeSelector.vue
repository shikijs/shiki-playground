<template>
  <div id="theme-selector" @mouseout="previewTheme('')">
    <div
      v-for="t in themes"
      :key="t"
      class="theme-option"
      :class="{ active: t === activeTheme }"
      @click="pickTheme(t)"
      @mouseover="previewTheme(t)"
    >
      {{ t }}
    </div>
  </div>
</template>

<script lang="ts">
import { BUNDLED_THEMES } from 'shiki'

import { ref, defineComponent } from 'vue'
export default defineComponent({
  setup: () => {
    const themes = ref(BUNDLED_THEMES)
    return { themes }
  },
  computed: {
    activeTheme(): string {
      return this.$store.state.theme
    },
    activePreviewTheme(): string {
      return this.$store.state.previewTheme
    }
  },
  methods: {
    pickTheme(t: string) {
      this.$store.commit('changeTheme', t)
    },
    previewTheme(t: string) {
      this.$store.commit('changePreviewTheme', t)
    }
  }
})
</script>

<style>
#theme-selector {
  overflow-y: auto;
  flex-shrink: 0;

  display: flex;
  flex-flow: column nowrap;
}

.theme-option {
  padding: 4px 12px 4px 8px;
}
.theme-option:hover {
  background-color: #eeeeee88;
}
.theme-option.active {
  background-color: #eee;
}
</style>