declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'shiki-renderer-svg/dist/index.browser.mjs' {
  export * from 'shiki-renderer-svg'
}
