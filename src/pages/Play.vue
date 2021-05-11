<template>
  <div id="play-container">
    <TopHeader />
    <div class="container">
      <ThemeSelector />
      <LangSelector />
      <Previewer />
      <Exporter />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TopHeader from '../components/TopHeader.vue'
import LangSelector from '../components/LangSelector.vue'
import ThemeSelector from '../components/ThemeSelector.vue'
import Previewer from '../components/Previewer.vue'
import Exporter from '../components/Exporter.vue'
import { BUNDLED_LANGUAGES } from 'shiki'
import { asyncLangsToLoad } from '../preload'
import { settingsFromURL } from '../settings'

export default defineComponent({
  name: 'App',
  components: {
    TopHeader,
    LangSelector,
    ThemeSelector,
    Previewer,
    Exporter
  },
  async beforeMount() {
    const defaultSettings = settingsFromURL()

    if (defaultSettings.theme) {
      await this.$store.dispatch('loadAndChangeTheme', defaultSettings.theme)
    } else {
      if (window.__theme === 'dark') {
        await this.$store.dispatch('loadAndChangeTheme', 'github-dark')
      } else {
        await this.$store.dispatch('loadAndChangeTheme', 'github-light')
      }
    }

    if (defaultSettings.lang) {
      await this.$store.dispatch('loadAndChangeLang', defaultSettings.lang)
    } else {
      await this.$store.dispatch('loadAndChangeLang', 'javascript')
    }

    const langToShow = this.$store.state.previewLang || this.$store.state.lang
    const langRegistration = BUNDLED_LANGUAGES.filter(l => l.id === langToShow)[0]

    if (defaultSettings.code) {
      this.$store.commit('changeCode', defaultSettings.code)
    } else {
      if (langRegistration?.samplePath) {
        const res = await fetch(`/shiki/samples/${langRegistration.samplePath}`)
        const text = await res.text()
        this.$store.commit('changeCode', text)
      }
    }

    for (let l of asyncLangsToLoad) {
      await this.$store.dispatch('loadLang', l)
    }
  }
})
</script>

<style>
#play-container {
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  overflow-y: hidden;
}
.container {
  display: grid;
  grid-template-columns: max-content max-content auto max-content;
  flex-flow: row nowrap;
  overflow-y: auto;
  height: 100%;
}
</style>
