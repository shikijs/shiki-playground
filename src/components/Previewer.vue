<template>
  <div 
    id="previewer"
    :style="{ color: fgColor, backgroundColor: bgColor }"
  >
    <div id="preview-container">
      <div id="shiki-output" v-html="code"></div>
      <textarea
        id="shiki-input"
        v-model="rawCode"
        ref="cc"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { highlighter } from '../highlighter'
import { asyncLangsToLoad } from '../preload'
import { initRawCode } from '../rawCode'

export default defineComponent({
  data() {
    return {
      showPreview: true,
      rawCode: initRawCode,
      highlightedCode: '',
      hl: undefined
    }
  },
  computed: {
    code(): string {
      return `${this.highlightedCode}`
    },
    activeLang(): string {
      return this.$store.state.lang
    },
    activeTheme(): string {
      return this.$store.state.theme
    },
    activePreviewTheme(): string {
      return this.$store.state.previewTheme
    },
    fgColor() {
      return this.$store.state.fgColor
    },
    bgColor() {
      return this.$store.state.bgColor
    }
  },
  watch: {
    async rawCode(c) {
      this.$store.commit('changeCode', c)
      this.refreshPreview()
    },
    async activeLang() {
      await this.updateHighlighter()
    },
    async activeTheme() {
      await this.updateHighlighter()
    },
    async activePreviewTheme() {
      await this.updateHighlighter()
    }
  },
  async mounted() {
    this.$store.commit('changeCode', initRawCode)

    this.$store.dispatch('loadAndPickLang', 'javascript')

    if (window.__theme === 'dark') {
      this.$store.dispatch('loadAndPickTheme', 'github-dark')
    } else {
      this.$store.dispatch('loadAndPickTheme', 'github-light')
    }

    for (let l of asyncLangsToLoad) {
      this.$store.dispatch('loadLang', l)
    }
  },
  methods: {
    async updateHighlighter() {
      const themeToShow = this.activePreviewTheme !== '' ? this.activePreviewTheme : this.activeTheme

      this.highlightedCode = highlighter.codeToHtml((this.$refs as any).cc.value, this.activeLang, themeToShow)
    },
    async refreshPreview() {
      this.showPreview = true
      await this.updateHighlighter()
    },
    hidePreview() {
      this.showPreview = false
      ;(this.$refs as any).cc.focus()
    }
  }
})
</script>

<style>
#previewer {
  position: relative;
  height: 100%;
  border-left: var(--border);
  overflow: auto;
}
#preview-container {
  position: absolute;
  width: auto;
}
#shiki-input, #shiki-output {
  line-height: 1.3em;
  font-size: 12px;
  min-height: 100%;
  padding: 8px;
  height: 100%;
  font-family: var(--mono-font);
  white-space: pre-wrap;
}
#shiki-input {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  resize: none;
  caret-color: white;
  color: transparent;
  background-color: transparent;
  border: 0;
  outline: none;
  width: 100%;
}
pre {
  margin: 0;
}
pre code {
  font-family: var(--mono-font);
  font-size: 12px;
}
</style>
