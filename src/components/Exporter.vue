<template>
  <div id="exporter">
    <div class="export-option" @click="saveToImage">save to image</div>
    <div class="export-option" @click="saveToSVG">save to svg</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getSVGRenderer } from 'shiki-renderer-svg/dist/index.browser.mjs'
import domtoimage from 'dom-to-image'
import { saveAs } from 'file-saver'
import { getHighlighter } from '../highlighter'

export default defineComponent({
  data() {
    return {
      bgColor: ''
    }
  },
  computed: {
    activeTheme(): string {
      return this.$store.state.theme
    }
  },
  watch: {
    async activeTheme() {
      await this.updateBgColor()
    }
  },
  async mounted() {
    await this.updateBgColor()
  },
  methods: {
    async updateBgColor() {
      const hl = await getHighlighter()
      this.bgColor = hl.getBackgroundColor(this.activeTheme)
    },
    saveToImage() {
      const node = document.querySelector('.shiki')!

      domtoimage
        .toBlob(node, {
          width: node.clientWidth * 2,
          height: node.clientHeight * 2,
          style: {
            transform: 'scale(2)',
            'transform-origin': 'top left',
            padding: 0,
            background: this.bgColor
          }
        })
        .then((blob) => {
          saveAs(blob, 'shiki.png')
        })
    },
    async saveToSVG() {
      const hl = await getHighlighter()
      const svgRenderer = await getSVGRenderer({
        bg: '#2E3440',
        fontFamily: 'SFMono-Regular',
        fontSize: 12,
        bgSideCharPadding: 2,
        bgVerticalCharPadding: 0.6
      })

      const svgOut = svgRenderer.renderToSVG(
        hl.codeToThemedTokens(this.$store.state.code, this.$store.state.lang, this.activeTheme),
        { bg: this.bgColor }
      )
      saveAs(new Blob([svgOut], { type: 'text/plain;charset=utf-8' }), 'shiki.svg')
    }
  }
})
</script>

<style>
#exporter {
  border-left: 1px solid #eee;

  flex-shrink: 0;

  display: flex;
  flex-flow: column nowrap;
}
#exporter button {
  margin-bottom: 1rem;
}
.export-option {
  padding: 4px 12px 4px 8px;
}
.export-option:hover {
  background-color: #eeeeee88;
}
</style>