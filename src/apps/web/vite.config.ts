import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve as pathResolve, join as pathJoin } from 'path';
import { sync as glob } from 'fast-glob';
import { existsSync, mkdirSync, copyFileSync } from 'fs';

function cloneIndexHtmlPlugin(routes: string[] = []): PluginOption {
  const name = 'CloneIndexHtmlPlugin'
  const outDir = 'dist' // config's `build.outDir`
  const src = pathJoin(outDir, 'index.html')

  return {
    name,
    closeBundle: () => {
      const PAGE_EXT = '.vue'
      const PAGE_INDEX = 'index'

      routes.push(
        ...glob(`**/*${PAGE_EXT}`, {
          cwd: 'src/pages',
        })
          .map((p) => {
            p = p.substring(0, p.length - PAGE_EXT.length)
            if (p.endsWith('/' + PAGE_INDEX)) {
              p = p.substring(0, p.length - PAGE_INDEX.length - 1)
            }

            return p
          })
          .filter((p) => p !== PAGE_INDEX),
      )

      routes.map((p) => {
        const dir = pathResolve(outDir, p)
        if (!existsSync(dir)) {
          mkdirSync(dir, { recursive: true })
        }

        const dst = pathJoin(outDir, p, 'index.html')

        copyFileSync(src, dst)
        console.log(`${name}: Copied ${src} to ${dst}`)
      })
    },
  }
}

export default defineConfig({
  base: '/sports.ru-football-noofficial-bot/',
  // base: process.env.GH ? '/sports.ru-football-noofficial-bot' : '/',
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
      '@web' : pathResolve(__dirname, './src')
    },
  },
  plugins: [ vue(), cloneIndexHtmlPlugin() ]
})
