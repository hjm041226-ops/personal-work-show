import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 向每个 scss 文件注入设计令牌与 mixin，组件 css 内无需重复 @use
        additionalData: `@use "@/common/scss/_tokens.scss" as *;\n@use "@/common/scss/_mixins.scss" as *;\n`,
      },
    },
  },
})
