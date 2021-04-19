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
:root {
  --mono-font: 'SFMono-Regular', Menlo, Consolas, Monaco, Liberation Mono, 'Lucida Console', monospace;
  --mono-font-size: 12px;
}
</style>

<style>
body {
  color: #24292e;
  background-color: #fff;
  --foreground: #24292e;
  --background: #fff;
  --focus-background: #cce5ff;
  --hover-background: #ebf0f4;
  --border: 1px solid #e1e4e8;
}

body.dark {
  color: #e1e4e8;
  background-color: #24292e;
  --foreground: #e1e4e8;
  --background: #24292e;
  --focus-background: #044289;
  --hover-background: #282e34;
  --border: 1px solid #2f363d;
}
</style>

<style>
body {
  margin: 0;
  font-family: var(--mono-font);
  font-size: var(--mono-font-size);
}

#app {
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;
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
