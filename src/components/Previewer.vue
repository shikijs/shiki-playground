<template>
  <div id="previewer" @keydown="onKeydown">
    <textarea
      id="shiki-input"
      cols="80"
      v-model="rawCode"
      ref="cc"
      :style="{ color: fgColor, backgroundColor: bgColor }"
      @mouseout="() => (this.showPreview = true)"
    />
    <div id="shiki-output" :class="{ active: showPreview }" v-html="code" @click="hidePreview"></div>
  </div>
</template>

<script lang="ts">
import { getHighlighter } from '../highlighter'
import { defineComponent } from 'vue'
import { initRawCode } from '../rawCode'

export default defineComponent({
  data() {
    return {
      showPreview: false,
      rawCode: initRawCode,
      highlightedCode: '',
      hl: undefined,
      fgColor: '',
      bgColor: ''
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
    }
  },
  watch: {
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
    this.$store.commit('changeCode', initRawCode)
    await this.updateHighlighter()
    this.showPreview = true
  },
  methods: {
    async updateHighlighter() {
      const hl = await getHighlighter()

      const themeToShow = this.activePreviewTheme !== '' ? this.activePreviewTheme : this.activeTheme

      this.highlightedCode = hl.codeToHtml(this.$refs.cc.value, this.activeLang, themeToShow)
      this.fgColor = hl.getForegroundColor(themeToShow)
      this.bgColor = hl.getBackgroundColor(themeToShow)
    },
    async onKeydown(ev) {
      if (ev.ctrlKey && ev.key === 'Enter') {
        this.showPreview = !this.showPreview
        await this.updateHighlighter()
        ev.preventDefault()
      }
    },
    hidePreview() {
      this.showPreview = false
      this.$refs.cc.focus()
    }
  }
})
</script>

<style>
#previewer {
  position: relative;
  height: 100%;
  border-left: 1px solid #eee;
}
#shiki-input {
  font-family: 'SFMono-Regular';
  font-size: 12px;
  height: 100%;
  padding-top: 4px;
  padding-left: 16px;
  border: 0;
  outline: none;
}
#shiki-output {
  font-size: 12px;
  position: absolute;
  top: 4px;
  left: 0;

  padding-left: 16px;
  height: 100%;
  z-index: -1;
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