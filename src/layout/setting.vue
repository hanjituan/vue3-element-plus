<template>
	<div @click="showDrawer" ref="settingRef" class="fixed right-4 bottom-1/2 z-2">
		<div ref="settingBtn" class="rounded bg-blue-300 w-12 h-12 shadow-lg flex items-center justify-center">
			<el-icon class="text-white">
				<Setting />
			</el-icon>
		</div>

		<el-drawer append-to-body v-model="drawer" title="配置修改" direction="rtl">
			<el-divider>布局</el-divider>

			<div class="flex flex-wrap">
				<el-container class="layout-wrapper">
					<el-header class="layout-header">Header</el-header>
					<el-container class="layout-container">
						<el-aside class="layout-aside" width="200px">Aside</el-aside>
						<el-main class="layout-main">Main</el-main>
					</el-container>
				</el-container>
			</div>

		</el-drawer>
	</div>
</template>

<script lang="ts" setup>

import { onMounted, Ref, ref } from 'vue';
import { Setting } from '@element-plus/icons-vue'

const emit = defineEmits(["updatePosition"])

const transformX = ref(0)
const transformY = ref(0)
const drawer = ref(false)
const chatBtnMouseX = ref(0)
const chatBtnMouseY = ref(0)
const settingRef = ref(null)
const settingIconTop = ref(0)
const chatBtnDown = ref(false)
const settingIconBottom = ref(0)
const chatBtnDragged = ref(false)
const settingBtn: Ref<HTMLDivElement | null> = ref(null)

// 拖动之后恢复 Y 轴的位置, 计算拖动边界, 防止拖到屏幕外
const resetBoundary = () => {
	settingBtn.value!.style.transition = `all ease 0.2s`;

	// 🔼 scroll
	if (transformY.value < 0 && Math.abs(transformY.value) > settingIconTop.value) {
		transformY.value = -settingIconTop.value;
	}

	// 🔽 scroll
	if (transformY.value > 0 && transformY.value > settingIconBottom.value) {
		transformY.value = settingIconBottom.value;
	}

	settingBtn.value!.style.transform = `translate3d(0, ${transformY.value}px, 0)`;

	// setTimeout(() => {
	// 	settingRef.value!.style.bottom = `calc(50% - ${transformY.value}px)`;
	// 	settingBtn.value!.style.transform = `translate3d(0, 0, 0)`;
	// 	console.log(settingRef.value!.style!.bottom);
	// 	console.log(transformY.value);
	// }, 1000);
	// emit('updatePosition', transformX.value, transformY.value)

}

const showDrawer = () => {
	if (chatBtnDragged.value) return
	drawer.value = true
}

const initDrag = () => {

	settingBtn.value?.addEventListener('mousedown', (e) => {
		settingBtn.value!.style.transition = 'none'
		settingBtn.value!.style.cursor = 'grab'
		if (!chatBtnMouseX.value && !chatBtnMouseY.value) {
			chatBtnMouseX.value = e.clientX;
			chatBtnMouseY.value = e.clientY;
		}
		chatBtnDown.value = true;
	});

	document.addEventListener('mouseup', (e) => {
		if (!settingBtn.value) return
		if (!chatBtnDown.value) return

		settingBtn.value!.style.cursor = 'default'
		// set chatBtnMouseX and chatBtnMouseY to micro task
		setTimeout(() => {
			resetBoundary()
			chatBtnDragged.value = false;
			chatBtnDown.value = false;
		}, 0);
	});

	document.addEventListener('mousemove', (e) => {
		if (!chatBtnDown.value) return;
		e.preventDefault()
		chatBtnDragged.value = true;
		transformX.value = e.clientX - chatBtnMouseX.value;
		transformY.value = e.clientY - chatBtnMouseY.value;
		settingBtn.value!.style.transform = `translate3d(${transformX.value}px, ${transformY.value}px, 0)`;
		e.stopPropagation();
	});
}

onMounted(async () => {
	initDrag();
	settingIconTop.value = settingBtn.value!.getBoundingClientRect().top
	settingIconBottom.value = settingBtn.value!.getBoundingClientRect().bottom
})
</script>

<style>
.layout-wrapper {
	border: 1px solid red;
	display: flex;
	gap: 8px;
}

.layout-header {
	background-color: var(--el-color-primary);
	color: var(--el-color-white);
	line-height: 60px;
}

.layout-aside {
	background-color: var(--el-color-primary-light-7);
	color: var(--el-color-white);
	line-height: 200px;
}

.layout-main {
	background-color: var(--el-color-primary-light-9);
	color: var(--el-color-primary);
}
</style>
