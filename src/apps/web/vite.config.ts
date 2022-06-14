import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  server: {
    watch: {
      ignored: [
        '!**/node_modules/**'
      ]
    },
    hmr: {},
  },
  plugins: [ vue() ]
})
