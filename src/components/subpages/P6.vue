<template>
  <hexagon-divider :color="color" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HexagonDivider from './HexagonDivider.vue'

export default defineComponent({
  props: ['color'],
  data() {},
  components: {
    HexagonDivider
  }
})
</script>