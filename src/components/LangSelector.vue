<template>
  <div id="lang-selector">
    <div class="lang-option-empty">--- loaded ---</div>

    <div
      v-for="l in loadedLangs"
      :key="l"
      class="lang-option"
      :class="{ active: l === activeLang }"
      @click="pickLang(l)"
    >
      {{ l }}
    </div>

    <div class="lang-option-empty">--- others ---</div>

    <div
      v-for="l in unloadedLangs"
      :key="l"
      class="lang-option"
      :class="{ active: l === activeLang }"
      @click="loadAndPickLang(l)"
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
      return this.$store.state.allLangs
        .filter((l) => l.loaded)
        .map((l) => l.lang)
        .sort()
    },
    unloadedLangs(): Lang[] {
      return this.$store.state.allLangs
        .filter((l) => !l.loaded)
        .map((l) => l.lang)
        .sort()
    },
    activeLang(): string {
      return this.$store.state.lang
    }
  },
  methods: {
    pickLang(l: string) {
      this.$store.commit('changeLang', l)
    },
    loadAndPickLang(l: Lang) {
      this.$store.dispatch('loadAndPickLang', l)
    },
  }
})
</script>

<style>
#lang-selector {
  overflow-y: auto;
  flex-shrink: 0;

  display: flex;
  flex-flow: column nowrap;

  border-left: 1px solid #eee;
}

.lang-option {
  padding: 4px 12px 4px 8px;
}
.lang-option:hover {
  background-color: #eeeeee88;
}
.lang-option.active {
  background-color: #eee;
}
.lang-option-empty {
  padding: 4px 12px 4px 8px;
  color: #999;
}
</style>