<template>
  <div id="previewer" :style="{ color: fgColor, backgroundColor: bgColor }">
    <div id="preview-container">
      <div id="shiki-output" :class="{ active: showPreview }" v-html="highlightedCode" @click="hidePreview"></div>
      <textarea id="shiki-input" v-model="rawCode" ref="cc" :style="{ caretColor: fgColor }" />
    </div>
  </div>
</template>

<script lang="ts">
import { BUNDLED_LANGUAGES } from 'shiki'
import { defineComponent } from 'vue'
import { highlighter } from '../highlighter'
import { asyncLangsToLoad } from '../preload'

export default defineComponent({
  data() {
    return {
      showPreview: true,
      rawCode: '',
      highlightedCode: '',
      hl: undefined
    }
  },
  computed: {
    code(): string {
      return this.$store.state.code
    },
    langToShow(): string {
      return this.$store.state.previewLang ||  this.$store.state.lang
    },
    themeToShow(): string {
      return this.$store.state.previewTheme || this.$store.state.theme
    },
    fgColor() {
      return this.$store.state.fgColor
    },
    bgColor() {
      return this.$store.state.bgColor
    }
  },
  watch: {
    async code(c) {
      this.rawCode = c
      await this.updateHighlighter()
    },
    async rawCode(c) {
      this.$store.commit('changeCode', c)
      this.refreshPreview()
    },
    async langToShow() {
      await this.updateHighlighter()
    },
    async themeToShow() {
      await this.updateHighlighter()
    },
  },
  async mounted() {
    await this.$store.dispatch('loadAndchangeLang', 'javascript')

    const langRegistration = BUNDLED_LANGUAGES.filter((l) => l.id === this.langToShow)[0]

    if (langRegistration?.samplePath) {
      const res = await fetch(`/shiki/samples/${langRegistration.samplePath}`)
      const text = await res.text()
      this.rawCode = text
      this.$store.commit('changeCode', text)
    }

    if (window.__theme === 'dark') {
      this.$store.dispatch('loadAndchangeTheme', 'github-dark')
    } else {
      this.$store.dispatch('loadAndchangeTheme', 'github-light')
    }

    for (let l of asyncLangsToLoad) {
      await this.$store.dispatch('loadLang', l)
    }
  },
  methods: {
    async updateHighlighter() {
      this.highlightedCode = highlighter.codeToHtml(this.code, this.langToShow, this.themeToShow)
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
#previewer-container {
  position: absolute;
  width: auto;
}
#shiki-input,
#shiki-output {
  line-height: 1.3em;
  font-size: 12px;
  padding: 4px 16px;
  height: calc(100% - 16px);
  padding: 8px;
  font-family: var(--mono-font);
}
#shiki-input {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  resize: none;
  color: transparent;
  background-color: transparent;
  border: 0;
  outline: none;
  width: 100%;
}
#shiki-output {
  display: inline-block;
  pointer-events: none;
}
pre {
  margin: 0;
}
pre code {
  font-family: var(--mono-font);
  font-size: 12px;
  white-space: pre-wrap;
}
.shiki {
  display: inline-block;
}
</style>