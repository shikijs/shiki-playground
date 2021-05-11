<template>
  <div id="theme-selector" @mouseout="loadAndChangeTheme(activeTheme)">
    <div class="theme-option-empty">--- loaded ---</div>

    <div
      v-for="t in loadedThemes"
      :key="t"
      class="theme-option"
      :class="{ active: t === activeTheme }"
      @click="loadAndChangeTheme(t)"
      @mouseover="previewTheme(t)"
      @mouseout="previewTheme('')"
    >
      {{ t }}
    </div>

    <div class="theme-option-empty">--- others ---</div>

    <div
      v-for="t in unloadedThemes"
      :key="t"
      class="theme-option"
      :class="{ active: t === activeTheme }"
      @click="loadAndChangeTheme(t)"
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
      return this.$store.state.loadedThemes
    },
    unloadedThemes(): Theme[] {
      return this.$store.state.unloadedThemes
    },
    activeTheme(): string {
      return this.$store.state.theme
    },
    activePreviewTheme(): string {
      return this.$store.state.previewTheme
    }
  },
  methods: {
    loadAndChangeTheme(t: string) {
      this.$store.dispatch('loadAndChangeTheme', t)
    },
    previewTheme(t: string) {
      this.$store.dispatch('changePreviewTheme', t)
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

  color: var(--sidebar-fg);
  background-color: var(--sidebar-bg);
}
#theme-selector::-webkit-scrollbar {
  display: none;
}

.theme-option {
  padding: 4px 12px 4px 8px;
  cursor: pointer;
}
.theme-option:hover {
  color: var(--hover-foreground);
  background-color: var(--hover-background);
}
.theme-option.active {
  color: var(--active-selection-foreground);
  background-color: var(--active-selection-background);
}
.theme-option-empty {
  padding: 4px 12px 4px 8px;
  color: #999;
}
</style>
