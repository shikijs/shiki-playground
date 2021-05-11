<template>
  <router-view></router-view>
</template>

<style>
:root {
  --mono-font: 'SFMono-Regular', Menlo, Consolas, Monaco, Liberation Mono, 'Lucida Console',
    monospace;
  --mono-font-size: 12px;
  --ystep: 24px;
}
</style>

<style>
body {
  --foreground: #24292e;
  --background: #fff;
  --active-selection-foreground: #2f363d;
  --focus-background: #cce5ff;
  --focus-foreground: #24292e;
  --hover-background: #ebf0f4;
  --hover-foreground: #24292e;
  --border: 1px solid #e1e4e8;
}

body.dark {
  --foreground: #e1e4e8;
  --background: #24292e;
  --active-selection-foreground: #e1e4e8;
  --focus-background: #044289;
  --focus-foreground: #e1e4e8;
  --hover-background: #282e34;
  --hover-foreground: #e1e4e8;
  --border: 1px solid #2f363d;
}
body {
  color: var(--foreground);
  background-color: var(--background);
}
</style>

<style>
body {
  margin: 0;
  min-width: calc(32px * 20);
  font-family: var(--mono-font);
  font-size: var(--mono-font-size);
}

#app {
}
</style>

<style>
a {
  color: var(--foreground);
}
a:hover {
  text-decoration: line-through;
}
</style>