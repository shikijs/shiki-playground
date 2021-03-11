<template>
  <header id="header">
    <span id="logo">shiki - a beautiful syntax highlighter</span>
    <nav>
      <ul>
        <li><a target="_blank" href="https://github.com/shikijs/shiki">github</a></li>
        <li><a target="_blank" href="https://shiki.matsu.io/">docs</a></li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style>
#header {
  border-bottom: 1px solid #eee;
  display: flex;

  padding: 1rem 2rem;
  justify-content: space-between;
}
#logo {
  display: flex;
}

#header ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
#header li {
  display: inline-block;
  margin-right: 0.5rem;
}
#header a {
  color: #000;
  text-decoration: none;
}
#header a:hover {
  text-decoration: underline;
}
</style>