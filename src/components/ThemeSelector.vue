<template>
  <div id="theme-selector" @mouseout="previewTheme('')">
    <div class="theme-option-empty">--- loaded ---</div>

    <div
      v-for="t in loadedThemes"
      :key="t"
      class="theme-option"
      :class="{ active: t === activeTheme }"
      @click="pickTheme(t)"
      @mouseover="previewTheme(t)"
    >
      {{ t }}
    </div>

    <div class="theme-option-empty">--- others ---</div>

    <div
      v-for="t in unloadedThemes"
      :key="t"
      class="theme-option"
      :class="{ active: t === activeTheme }"
      @click="loadAndPickTheme(t)"
    >
      {{ t }}
    </div>
  </div>
</template>

<script lang="ts">
import { Theme } from 'shiki'
import { defineComponent } from 'vue'

export default defineComponent({
  computed: {
    loadedThemes(): Theme[] {
      return this.$store.state.allThemes
        .filter((t) => t.loaded)
        .map((t) => t.theme)
        .sort()
    },
    unloadedThemes(): Theme[] {
      return this.$store.state.allThemes
        .filter((t) => !t.loaded)
        .map((t) => t.theme)
        .sort()
    },
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
    loadAndPickTheme(t: string) {
      this.$store.dispatch('loadAndPickTheme', t)
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
.theme-option-empty {
  padding: 4px 12px 4px 8px;
  color: #999;
}
</style>