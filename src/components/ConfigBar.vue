<template>
  <div id="config-bar">
    <label for="fontSelect">Font</label>
    <select v-model="font" name="font" id="fontSelect">
      <option v-for="s in fontSources" :key="s.name" :value="s.name">{{ s.name }}</option>
    </select>
    <label for="fontSize">Size</label>
    <select v-model="fontSize" name="fontSize" id="fontSizeSelect">
      <option v-for="s in fontSizes" :key="s" :value="s">{{ s }}px</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defaultFont, fontSources, fontSizes, defaultFontSize } from '../fonts'

export default {
  data() {
    return {
      defaultFont,
      fontSources,
      fontSizes,
      font: defaultFont,
      fontSize: defaultFontSize
    }
  },
  watch: {
    font(f) {
      this.$store.dispatch('changeFont', f)
    },
    fontSize(fs) {
      this.$store.dispatch('changeFontSize', fs)
    }
  }
}
</script>

<style>
#config-bar {
  display: flex;
  align-items: center;

  position: absolute;
  bottom: 0;
  width: 100%;
  border-top: var(--border);
  padding: 0 12px;
  color: var(--foreground);
  background-color: var(--background);
}
#config-bar select,
#config-bar label {
  padding-top: 2px;
  padding-bottom: 2px;
}
#config-bar select {
  font-family: var(--mono-font);
  font-size: var(--mono-font-size);
  border-left: var(--border);
  border-right: var(--border);
  margin-left: 8px;
  margin-right: 8px;
  border-top: none;
  border-bottom: none;
  background-color: var(--background);
  color: var(--foreground);
}
</style>