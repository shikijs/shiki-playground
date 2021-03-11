<template>
  <div id="lang-selector">
    <div
      v-for="l in langs"
      :key="l"
      class="lang-option"
      :class="{ active: l.id === activeLang }"
      @click="pickLang(l.id)"
    >
      {{ l.id }}
    </div>
  </div>
</template>

<script lang="ts">
import { BUNDLED_LANGUAGES } from 'shiki'
import { ref, defineComponent } from 'vue'

export default defineComponent({
  setup: () => {
    const langs = ref(BUNDLED_LANGUAGES)
    return { langs }
  },
  computed: {
    activeLang(): string {
      return this.$store.state.lang
    }
  },
  methods: {
    pickLang(l: string) {
      this.$store.commit('changeLang', l)
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
</style>