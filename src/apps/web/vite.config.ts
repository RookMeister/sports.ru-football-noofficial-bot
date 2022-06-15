import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const path = require('path');

export default defineConfig({
  base: process.env.GH ? '/sports.ru-football-noofficial-bot' : '/',
  server: {
    watch: {
      ignored: [
        '!**/node_modules/**'
      ]
    },
    hmr: {},
  },
  resolve:{
    alias:{
      '@' : path.resolve(__dirname, './src')
    },
  },
  plugins: [ vue() ]
})
