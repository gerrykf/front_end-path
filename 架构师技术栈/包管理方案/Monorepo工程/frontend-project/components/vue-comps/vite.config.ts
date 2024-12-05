import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import path from 'path';
import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib.ts'),
      name: 'gy-vue-ui',
      formats: ['es'],
      fileName: (format) => `gy-lib.${format}.ts`,
    },
    rollupOptions: {
      external: ['vue'], // 打包时不打包vue
      output: {
        globals: {
          vue: 'Vue',
        },
        exports: 'named', // 使用命名导出
        assetFileNames: 'assets/[name].[ext]', // 输出文件夹
      },
      plugins: [
        typescript({
          tsconfig: path.resolve(__dirname, 'tsconfig.json'), // 使用自定义tsconfig
          useTsconfigDeclarationDir: true, // 使用tsconfig中的声明文件目录
          clean: true, // 清除之前的声明文件
          exclude: ['**/__tests__/**', '**/*.test.ts'], // 不编译测试文件
        }),
        copy({
          targets: [
            {
              src: 'src/assets/fonts/*',
              dest: 'dist/assets/fonts',
            }, // 复制字体文件到输出目录
          ],
          verbose: true, // 显示复制信息
          hook: 'writeBundle', // 在打包完成后复制
        }),
      ],
    },
    emptyOutDir: true, // 清空输出目录
  },
});
