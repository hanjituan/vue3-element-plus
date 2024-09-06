<template>
	<div class="border border-b-0 relative">

		<el-menu default-active="2" class="el-menu-vertical-demo border-r-0" :collapse="isCollapse" @open="handleOpen"
			@close="handleClose">
			<el-sub-menu index="1">
				<template #title>
					<el-icon>
						<location />
					</el-icon>
					<span>Navigator One</span>
				</template>
				<el-menu-item-group>
					<template #title><span>Group One</span></template>
					<el-menu-item index="1-1">item one</el-menu-item>
					<el-menu-item index="1-2">item two</el-menu-item>
				</el-menu-item-group>
				<el-menu-item-group title="Group Two">
					<el-menu-item index="1-3">item three</el-menu-item>
				</el-menu-item-group>
				<el-sub-menu index="1-4">
					<template #title><span>item four</span></template>
					<el-menu-item index="1-4-1">item one</el-menu-item>
				</el-sub-menu>
			</el-sub-menu>
			<el-menu-item index="2">
				<el-icon><icon-menu /></el-icon>
				<template #title>Navigator Two</template>
			</el-menu-item>
			<el-menu-item index="3">
				<el-icon>
					<document />
				</el-icon>
				<template #title>Navigator Three</template>
			</el-menu-item>
			<el-menu-item index="4">
				<el-icon>
					<setting />
				</el-icon>
				<template #title>Navigator Four</template>
			</el-menu-item>
		</el-menu>

		<div class="absolute border-b-0 border-r-0 bottom-0 left-0 w-full p-4 border
		 flex items-center justify-center bg-white
		 hover:bg-blue-100 cursor-pointer transition-colors duration-300" @click="isCollapse = !isCollapse">
			<el-icon>
				<Expand v-if="isCollapse" />
				<Fold v-else />
			</el-icon>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
	Document,
	Menu as IconMenu,
	Location,
	Setting,
	Expand,
	Fold
} from '@element-plus/icons-vue'

const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
	console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
	console.log(key, keyPath)
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 200px;
	min-height: 400px;
}
</style>
