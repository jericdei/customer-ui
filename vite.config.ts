import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('node:path')

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
})
