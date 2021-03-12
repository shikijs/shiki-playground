<template>
  <TopHeader />
  <div class="container">
    <ThemeSelector />
    <LangSelector />
    <Previewer />
    <Exporter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TopHeader from './components/TopHeader.vue'
import LangSelector from './components/LangSelector.vue'
import ThemeSelector from './components/ThemeSelector.vue'
import Previewer from './components/Previewer.vue'
import Exporter from './components/Exporter.vue'

export default defineComponent({
  name: 'App',
  components: {
    TopHeader,
    LangSelector,
    ThemeSelector,
    Previewer,
    Exporter
  }
})
</script>

<style>
body {
  margin: 0;
  font-family: 'SFMono-Regular';
  font-size: 12px;
}

#app {
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;
  overflow-y: hidden;
}
.container {
  display: flex;
  flex-flow: row nowrap;
  overflow-y: auto;
  height: 100%;
}
</style>