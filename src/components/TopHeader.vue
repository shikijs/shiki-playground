<template>
  <header id="header">
    <span id="logo">shiki - a beautiful syntax highlighter</span>
    <nav id="right-nav">
      <ul>
        <li><a @click="syncURLWithSettings">permalink</a></li>
        <li><a target="_blank" href="https://github.com/shikijs/shiki-playground">github</a></li>
        <li><a target="_blank" href="https://shiki.matsu.io/">docs</a></li>
        <li @click="toggleDarkMode">
          <a class="toggleDarkModeIcon"></a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { syncURLWithSettings } from '../settings'

const toggleDarkMode = () => {
  window.__setPreferredTheme(window.__theme === 'light' ? 'dark' : 'light')
}

export default defineComponent({
  methods: {
    toggleDarkMode,
    syncURLWithSettings() {
      syncURLWithSettings(this.$store.state)
    }
  }
})
</script>

<style>
#header {
  border-bottom: var(--border);
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
  margin-right: 0.8rem;
}
#header a {
  color: #000;
  text-decoration: none;
}
#header a:hover {
  text-decoration: underline;
}

.sun-icon {
  display: none;
}
body.dark .moon-icon {
  display: none;
}
body.dark .sun-icon {
  display: block;
}

#right-nav a {
  color: var(--foreground);
  cursor: pointer;
}
#right-nav a svg {
  fill: var(--foreground);
}

.toggleDarkModeIcon {
  width: 16px;
  height: 16px;
  display: inline-block;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='16' height='16'%3E%3Cpath fill-rule='evenodd' d='M9.598 1.591a.75.75 0 01.785-.175 7 7 0 11-8.967 8.967.75.75 0 01.961-.96 5.5 5.5 0 007.046-7.046.75.75 0 01.175-.786zm1.616 1.945a7 7 0 01-7.678 7.678 5.5 5.5 0 107.678-7.678z'%3E%3C/path%3E%3C/svg%3E");
  text-decoration: none;
  vertical-align: bottom;
}
body.dark .toggleDarkModeIcon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='16' height='16'%3E%3Cpath fill='%23e1e4e8' fill-rule='evenodd' d='M8 10.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM8 12a4 4 0 100-8 4 4 0 000 8zM8 0a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V.75A.75.75 0 018 0zm0 13a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 018 13zM2.343 2.343a.75.75 0 011.061 0l1.06 1.061a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zm9.193 9.193a.75.75 0 011.06 0l1.061 1.06a.75.75 0 01-1.06 1.061l-1.061-1.06a.75.75 0 010-1.061zM16 8a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0116 8zM3 8a.75.75 0 01-.75.75H.75a.75.75 0 010-1.5h1.5A.75.75 0 013 8zm10.657-5.657a.75.75 0 010 1.061l-1.061 1.06a.75.75 0 11-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zm-9.193 9.193a.75.75 0 010 1.06l-1.06 1.061a.75.75 0 11-1.061-1.06l1.06-1.061a.75.75 0 011.061 0z'%3E%3C/path%3E%3C/svg%3E");
}
</style>