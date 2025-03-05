import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'https://restcountries.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '/v3.1')
            },
        },
    },
    esbuild: {
        loader: 'jsx',
    },
    optimizeDeps: {
        esbuild: {
            loader: {
                '.js': 'jsx',
            },
        },
    },
})
