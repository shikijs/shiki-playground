<template>
  <div id="previewer">
    <textarea
      id="shiki-input"
      cols="80"
      v-model="rawCode"
      ref="cc"
      :style="{ color: fgColor, backgroundColor: bgColor }"
      @mouseout="refreshPreview"
    />
    <div id="shiki-output" :class="{ active: showPreview }" v-html="highlightedCode" @click="hidePreview"></div>
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
    async code(c) {
      this.rawCode = c
      await this.updateHighlighter()
    },
    async rawCode(c) {
      this.$store.commit('changeCode', c)
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
    await this.$store.dispatch('loadAndPickLang', 'javascript')

    const langRegistration = BUNDLED_LANGUAGES.filter((l) => l.id === this.activeLang)[0]

    if (langRegistration?.samplePath) {
      const res = await fetch(`/shiki/samples/${langRegistration.samplePath}`)
      const text = await res.text()
      this.rawCode = text
      this.$store.commit('changeCode', text)
    }

    if (window.__theme === 'dark') {
      this.$store.dispatch('loadAndPickTheme', 'github-dark')
    } else {
      this.$store.dispatch('loadAndPickTheme', 'github-light')
    }

    for (let l of asyncLangsToLoad) {
      await this.$store.dispatch('loadLang', l)
    }
  },
  methods: {
    async updateHighlighter() {
      const themeToShow = this.activePreviewTheme !== '' ? this.activePreviewTheme : this.activeTheme

      this.highlightedCode = highlighter.codeToHtml(this.code, this.activeLang, themeToShow)
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
}
#shiki-input {
  font-family: 'SFMono-Regular';
  font-size: 12px;

  height: calc(100% - 4px);
  padding: 4px 0 0 16px;

  border: 0;
  outline: none;
}
#shiki-output {
  font-size: 12px;

  position: absolute;
  top: 4px;
  left: 0;
  padding-left: 16px;
  height: calc(100% - 4px);

  z-index: -1;

  overflow-y: auto;
}
#shiki-output.active {
  z-index: 1;
}
pre {
  margin: 0;
}
pre code {
  font-family: 'SFMono-Regular';
  font-size: 12px;
  white-space: pre-wrap;
}
</style>