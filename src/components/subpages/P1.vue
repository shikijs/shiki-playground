<template>
  <hexagon-divider :color="color" />
  <div>
    <p>
      Shiki supports TextMate grammar, the syntax highlighting format used by
      VS Code, Atom and Sublime Text.
    </p>

    <p>
      The benefits are:
      <ul>
        <li>Support for <span :style="{ color }">{{ langNum }}</span> languages</li>
        <li>Ease of adding language support — just include its TextMate grammar</li>
        <li>Editor-grade granularity</li>
      </ul>
    </p>

    <p>
      On granularity: <span :style="{ color }">Shiki highlights code as fine as VS Code.</span>
      Other highlighters, such as Prism and highlight.js, have way coarser highlighting. For example,
      take a look at this TSX snippet, highlighted by highlight.js, Prism and Shiki in Solarized Light theme.

    </p>

    <svg-comparison />

    <p>
      Prism is missing <i>italic</i>, <b>bold styling</b>, color <span style="color: #D30102; background-color: #FDF6E3">#D30102</span>,
      and color <span style="color: #073642; background-color: #FDF6E3">#073642</span>.
      <br/>
      While Shiki distinguishes between keywords such as
      <span style="color: #859900; background-color: #FDF6E3">export</span> and
      <span style="font-weight: bold; color: #073642; background-color: #FDF6E3;">async</span>,
      Prism mixes them all.
      <br/>
      highlight.js highlights even less than Prism.
    </p>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HexagonDivider from './HexagonDivider.vue'
import SvgComparison from './SvgComparison.vue'
import { BUNDLED_LANGUAGES } from 'shiki'

export default defineComponent({
  props: ['color'],
  data() {
    return {
      langNum: BUNDLED_LANGUAGES.length
    }
  },
  components: {
    HexagonDivider,
    SvgComparison
  }
})
</script>