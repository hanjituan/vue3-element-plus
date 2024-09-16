<template>
	<div @click="showDrawer">
		<div ref="ChatBtn" class="rounded bg-blue-300 w-12 h-12 shadow border flex items-center justify-center">
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

import { nextTick, onMounted, Ref, ref } from 'vue';
import { Setting } from '@element-plus/icons-vue'

const transformX = ref(0)
const transformY = ref(0)
const drawer = ref(false)
const chatBtnMouseX = ref(0)
const chatBtnMouseY = ref(0)
const chatBtnDown = ref(false)
const chatBtnDragged = ref(false)
const settingIconTop = ref(0)
const settingIconBottom = ref(0)
const ChatBtn: Ref<HTMLDivElement | null> = ref(null)


// 拖动之后恢复 Y 轴的位置, 计算拖动边界, 防止拖到屏幕外
const resetY = () => {
	ChatBtn.value!.style.transition = `all ease 0.2s`;

	// 🔼 scroll
	if (transformY.value < 0 && Math.abs(transformY.value) > settingIconTop.value) {
		transformY.value = -settingIconTop.value;
	}

	// 🔽 scroll
	if (transformY.value > 0 && transformY.value > settingIconBottom.value) {
		transformY.value = settingIconBottom.value;
	}

	ChatBtn.value!.style.transform = `translate3d(0, ${transformY.value}px, 0)`;
}

// 改变按钮位置TODO: 位置移动后, 更新fixed 的位置, 不然会抖动
const changePosition = (x: number, y: number) => {
	console.log(x, y);
	// console.log(x);
	// console.log(y);
	// console.log(viewportHeight);
	// if (y < 0) {
	// 	transformY.value = viewportHeight - 100
	// 	ChatBtn.value!.style.bottom = `${transformY.value}px`;
	// }
	// transformY.value = y
	// ChatBtn.value!.style.transform = `translate3d(${transformX.value}px, ${transformY.value}px, 0)`;
	// ChatBtn.value!.style.bottom = `${transformY.value}px`;
}

const showDrawer = () => {
	if (chatBtnDragged.value) return
	drawer.value = true
}

const initDrag = () => {

	ChatBtn.value?.addEventListener('mousedown', (e) => {
		ChatBtn.value!.style.transition = 'none'
		ChatBtn.value!.style.cursor = 'grab'
		if (!chatBtnMouseX.value && !chatBtnMouseY.value) {
			chatBtnMouseX.value = e.clientX;
			chatBtnMouseY.value = e.clientY;
		}
		chatBtnDown.value = true;
	});

	document.addEventListener('mouseup', (e) => {
		if (!ChatBtn.value) return
		ChatBtn.value!.style.cursor = 'default'
		// set chatBtnMouseX and chatBtnMouseY to micro task
		setTimeout(() => {
			resetY()
			chatBtnDragged.value = false;
			chatBtnDown.value = false;
			// changePosition(e.clientX, e.clientY)
		}, 0);
	});

	document.addEventListener('mousemove', (e) => {
		if (!chatBtnDown.value) return;
		e.preventDefault()
		chatBtnDragged.value = true;
		transformX.value = e.clientX - chatBtnMouseX.value;
		transformY.value = e.clientY - chatBtnMouseY.value;
		ChatBtn.value!.style.transform = `translate3d(${transformX.value}px, ${transformY.value}px, 0)`;
		e.stopPropagation();
	});
}

onMounted(async () => {
	await nextTick();
	initDrag();
	settingIconTop.value = ChatBtn.value!.getBoundingClientRect().top
	settingIconBottom.value = ChatBtn.value!.getBoundingClientRect().bottom
})
</script>

<style>
/* .layout-container {
	background-color: var(--el-color-primary-light-8);
} */
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
