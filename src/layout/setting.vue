<template>
	<div @click="showDrawer">
		<div ref="ChatBtn" class="rounded bg-blue-300 w-12 h-12 shadow border flex items-center justify-center">
			<el-icon class="text-white">
				<Setting />
			</el-icon>
		</div>

		<el-drawer v-model="drawer" title="I am the title" direction="rtl">
			<span>Hi, there!</span>
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
const ChatBtn: Ref<HTMLDivElement | null> = ref(null)

onMounted(async () => {
	await nextTick();
	initDrag();
})


// 拖动之后恢复 Y 轴的位置
const resetY = () => {
	ChatBtn.value!.style.transform = `translate3d(0, ${transformY.value}px, 0)`;
	ChatBtn.value!.style.transition = `all ease 0.2s`;
}

// 改变按钮位置TODO: 位置移动后, 更新fixed 的位置, 不然会抖动
const changePosition = (x: number, y: number) => {
	// transformX.value = x
	// transformY.value = y
	// ChatBtn.value!.style.transform = `translate3d(${transformX.value}px, ${transformY.value}px, 0)`;
	ChatBtn.value!.style.bottom = `${transformY.value}px`;
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
		ChatBtn.value!.style.cursor = 'default'
		// set chatBtnMouseX and chatBtnMouseY to micro task
		setTimeout(() => {
			resetY()
			chatBtnDragged.value = false;
			chatBtnDown.value = false;
			changePosition()
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


</script>
<style lang="less" scoped></style>
