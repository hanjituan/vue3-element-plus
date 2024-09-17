<template>
	<ul class="flex flex-wrap p-2 rounded bg-white dark:(bg-[#1d1d1d] text-white border)" ref="tabsContainerRef">
		<li v-for="(item, index) in tabs" :key="`${item.value}${index}`" :class="{ active: item.value == activeTab }"
			class="item-tab px-4 py-2 cursor-pointer flex items-center justify-center rounded"
			@click="selectTab(item, index)">
			<img v-if="item.url" class="w-4 mr-1" :src="item.url" alt="" />
			<span>{{ item.label }}</span>
			<slot name="item.slot"></slot>
		</li>

		<li :style="activeTabStyle"></li>
	</ul>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";

const props = defineProps({
	tabs: {
		type: Array,
		default: () => [
			{
				value: "line",
				label: "折线",
				url: "https://imagecdn.ymm56.com/ymmfile/static/resource/aecd539e-515f-41e8-b126-7ac38102cafd.webp",
			},
			{
				value: "table",
				label: "表格视图",
				url: "https://imagecdn.ymm56.com/ymmfile/static/resource/13428291-7a45-4430-8fa9-70f8d0dea937.webp",
			},
			{
				value: "sl",
				label: "罗罗诺亚·索隆",
			},
			{
				value: "zfz",
				label: "King·尊",
			},
		]
	},
	value: {
		type: String,
		default: "0",
	},
	type: {
		type: String,
		default: "line",
	}
})

const isFirst = ref(true)
const currentIndex = ref(0)
const activeTab = ref(undefined)
const tabsContainerRef = ref(null)

const activeTabStyle = computed(() => {
	const { width = 0, height = 0, top = 0, left = 0 } = getActiveTabStyle();

	const baseCss = {
		position: "fixed",
		left: 0,
		width: width + "px",
		height: height + "px",
		overflow: "hidden",
		background: "var(--el-color-primary)",
		transition: isFirst.value ? 'none' : "all ease 0.2s",
		transform: `translate(${left}px, ${top}px)`,
		zIndex: 1,
	}
	if (props.type === 'box') {
		return Object.assign(baseCss, { top: 0, })
	} else {
		return Object.assign(baseCss, {
			top: height + "px",
			height: "2px",
		})
	}

})

const getActiveTabStyle = () => {
	if (!activeTab.value && activeTab.value !== 0) return {};
	const currentItem = tabsContainerRef.value.children[currentIndex.value];
	if (!currentItem) return {};
	return currentItem.getBoundingClientRect();

}

// watch: {
// 	value(val) {
// 		this.activeTab = val;
// 	},
// }

const setDefault = () => {
	activeTab.value = props.value;
}

const emit = defineEmits(["input", "change"])

const selectTab = (item, index) => {
	isFirst.value = false
	currentIndex.value = index
	activeTab.value = item.value;
	emit("input", item.value);
	emit("change", item.value);
}

onMounted(() => {
	setDefault();
})
</script>

<style scoped>
.item-tab {
	white-space: nowrap;
	z-index: 2;
}

.item-tab:hover {
	color: var(--el-color-primary-light-3);
}

.active {
	color: var(--el-color-primary);
}
</style>
