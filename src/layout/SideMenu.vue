<template>
	<div class="relative">

		<el-menu default-active="1-2" class="el-menu-vertical-demo border-r-0" :collapse="isCollapse" @open="handleOpen"
			@close="handleClose">
			<template v-for="item in menuItems" :key="item.index">
				<!-- 有子菜单的情况 -->
				<el-sub-menu v-if="item.children?.length" :index="item.index">
					<template #title>
						<el-icon v-if="item.icon">
							<component :is="item.icon" />
						</el-icon>
						<span>{{ item.title }}</span>
					</template>

					<template v-for="child in item.children" :key="child.index">
						<!-- 处理二级子菜单 -->
						<el-sub-menu v-if="child.children?.length" :index="child.index">
							<template #title>
								<span>{{ child.title }}</span>
							</template>
							<el-menu-item v-for="grandChild in child.children" :key="grandChild.index"
								:index="grandChild.index">
								{{ grandChild.title }}
							</el-menu-item>
						</el-sub-menu>

						<!-- 普通二级菜单项 -->
						<el-menu-item v-else :index="child.index">
							{{ child.title }}
						</el-menu-item>
					</template>
				</el-sub-menu>

				<!-- 没有子菜单的情况 -->
				<el-menu-item v-else :index="item.index">
					<el-icon v-if="item.icon">
						<component :is="item.icon" />
					</el-icon>
					<template #title>{{ item.title }}</template>
				</el-menu-item>
			</template>
		</el-menu>

		<div class="absolute  bottom-0 left-0 w-full p-4 border-t h-51px
		 flex items-center justify-center
		 hover:bg-blue-100 dark:hover:bg-[#2c2c2c]
		 cursor-pointer transition-colors duration-300" @click="isCollapse = !isCollapse">
			<el-icon>
				<Expand v-if="isCollapse" />
				<Fold v-else />
			</el-icon>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Expand, Fold } from '@element-plus/icons-vue'
import { menuItems } from '../config/menu'

const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
	// console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
	// console.log(key, keyPath)
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 200px;
	min-height: 400px;
}

:root {
	--el-menu-bg-color: #ffffff;
}

html.dark {
	--el-menu-bg-color: #1d1d1d;
	--el-menu-text-color: #ffffff;
	--el-menu-hover-bg-color: #2c2c2c;
	--el-menu-border-color: #2c2c2c;
}

.dark .el-menu {
	border-right-color: var(--el-menu-border-color);
}

.dark .el-sub-menu__title:hover,
.dark .el-menu-item:hover {
	background-color: var(--el-menu-hover-bg-color);
}

.dark .el-menu-item.is-active {
	background-color: var(--el-menu-hover-bg-color);
}
</style>
