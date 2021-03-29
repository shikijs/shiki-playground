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
      @click="loadAndchangeLang(l)"
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
    loadAndchangeLang(l: Lang) {
      this.$store.dispatch('loadAndchangeLang', l)
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
}

.lang-option {
  padding: 4px 12px 4px 8px;
  cursor: pointer;
}
.lang-option:hover {
  background-color: var(--hover-background);
}
.lang-option.active {
  background-color: var(--focus-background);
}
.lang-option-empty {
  padding: 4px 12px 4px 8px;
  color: #999;
}
</style>