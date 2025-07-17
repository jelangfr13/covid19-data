import path from 'path'
import fs from 'fs/promises'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: 'load-js-files-as-jsx',
          setup(build) {
            build.onLoad(
              { filter: /src\\.*\.js$/ },
              async args => ({
                loader: 'jsx',
                contents: await fs.readFile(args.path, 'utf8')
              })
            )
          }
        }
      ]
    },
    include: [
      '@emotion/react',
      '@emotion/styled',
      '@mui/material/Tooltip'
    ]
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: [ '@emotion/babel-plugin' ]
      }
    })
  ],
  resolve: {
    alias: {
      src: path.resolve('src/')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  }
})