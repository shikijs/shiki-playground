<template>
  <div id="lang-selector">
    <div class="lang-option-empty">--- loaded ---</div>

    <div
      v-for="l in loadedLangs"
      :key="l"
      class="lang-option"
      :class="{ active: l === activeLang }"
      @click="changeLang(l)"
      @mouseover="previewLang(l)"
      @mouseout="previewLang('')"
    >
      {{ l }}
    </div>

    <div class="lang-option-empty">--- others ---</div>

    <div
      v-for="l in unloadedLangs"
      :key="l"
      class="lang-option"
      :class="{ active: l === activeLang }"
      @click="loadAndChangeLang(l)"
    >
      {{ l }}
    </div>
  </div>
</template>

<script lang="ts">
import { Lang } from 'shiki'
import { defineComponent } from 'vue'

export default defineComponent({
  computed: {
    loadedLangs(): Lang[] {
      return this.$store.state.loadedLangs
    },
    unloadedLangs(): Lang[] {
      return this.$store.state.unloadedLangs
    },
    activeLang(): string {
      return this.$store.state.lang
    }
  },
  methods: {
    changeLang(l: string) {
      this.$store.dispatch('changeLang', l)
    },
    loadAndChangeLang(l: Lang) {
      this.$store.dispatch('loadAndChangeLang', l)
    },
    previewLang(l: string) {
      this.$store.dispatch('changePreviewLang', l)
    }
  }
})
</script>

<style>
#lang-selector {
  overflow-y: auto;
  flex-shrink: 0;

  display: flex;
  flex-flow: column nowrap;

  border-left: var(--border);

  color: var(--sidebar-fg);
  background-color: var(--sidebar-bg);
}
#lang-selector::-webkit-scrollbar {
  display: none;
}

.lang-option {
  padding: 4px 12px 4px 8px;
  cursor: pointer;
}
.lang-option:hover {
  color: var(--hover-foreground);
  background-color: var(--hover-background);
}
.lang-option.active {
  color: var(--active-selection-foreground);
  background-color: var(--active-selection-background);
}
.lang-option-empty {
  padding: 4px 12px 4px 8px;
  color: #999;
}
</style>
