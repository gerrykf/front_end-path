import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

import path from 'path'
import typescript from 'rollup-plugin-typescript2'
import copy from 'rollup-plugin-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib.ts'),
      name: 'vuecoms',
      formats: ['es'],
      fileName: (format) => `vuecoms-lib.${format}.ts`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        exports: 'named', // 使用命名导出
        assetFileNames: 'assets/[name].[ext]' // 将静态资源打包到 assets 目录
      },
      plugins: [
        typescript({
          tsconfig: path.resolve(__dirname, 'tsconfig.json'),
          useTsconfigDeclarationDir: true, // 使用tsconfig.json中的声明文件目录
          clean: true, // 清理之前的编译结果
          exclude: ['tests', '**/*.test.ts']
        }),
        copy({
          targets: [
            { src: 'src/assets/fonts/*', dest: 'dist/assets/fonts' } // 复制字体文件
          ],
          verbose: true, // 显示复制的日志
          hook: 'writeBundle' // 在打包完成后执行
        })
      ]
    },
    emptyOutDir: true // 清除上一次打包的文件
  }
})
