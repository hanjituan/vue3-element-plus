import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		WindiCSS(),
		vue()
	],
	resolve: {
		alias: [{
			find: '@',
			replacement: resolve(__dirname, './src')
		}]
	}
})
