import { createWebHistory, createRouter } from 'vue-router'

import login from '@/pages/Login.vue'
import Layout from '@/layout/Layout.vue'

const routes = [
	{
		path: '/',
		redirect: '/login',
	},
	{
		path: '/login',
		name: 'login',
		component: login,
	},
	{
		path: '/layout',
		name: 'layout',
		component: Layout
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
