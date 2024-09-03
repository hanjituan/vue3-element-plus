import { createMemoryHistory, createRouter } from 'vue-router'

import login from '@/pages/Login.vue'
import Layout from '@/layout/Layout.vue'

const routes = [
	{
		path: '/',
		redirect: '/login',

	},
	{
		path: '/login',
		component: login,
	},
	{ path: '/layout', component: Layout },
]

const router = createRouter({
	history: createMemoryHistory(),
	routes,
})

export default router
