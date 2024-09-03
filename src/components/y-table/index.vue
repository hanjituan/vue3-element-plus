<template>
	<div class="bg-white rounded-sm">
		<!-- 表头基础样式 background: '#f5f7fa', height: '40px'  -->
		<el-table ref="realTable" :data="tableConfig.tableData" v-loading="tableConfig.loading" :key="tableConfig.name"
			:height="tableConfig.tableHeight" element-loading-text="加载中..." element-loading-spinner="el-icon-loading"
			v-bind="$attrs" :header-cell-style="{
				background: '#EBF0F7',
				height: '48px',
				color: '#3B464B',
				...$attrs['header-cell-style']
			}">

			<slot></slot>

			<ElTableItem :columns="tableConfig.columns" :align="tableConfig.align"
				:showOverflowTooltip="tableConfig.showOverflowTooltip">
			</ElTableItem>

			<slot name="suffix-column"></slot>

			<template #empty>
				<slot name="empty" v-if="$slots.empty"></slot>

				<div class="flex flex-wrap justify-center" v-else>
					<img class="h-48"
						src="https://imagecdn.ymm56.com/ymmfile/static/resource/1278ac47-6d98-4535-be8e-19b4a82f68fd.png"
						alt="" />
					<span class="w-full">暂无数据</span>
				</div>
			</template>
		</el-table>

		<div class="flex justify-between mt-4" v-if="showPagination">
			<div>
				<slot name="pageStart"></slot>
			</div>
			<el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="tableConfig.pageNum"
				:page-size="tableConfig.pageSize" :page-sizes="[10, 20, 50, 100]"
				layout="total, sizes, prev, pager, next, jumper" :total="tableConfig.total" background>
				>
			</el-pagination>
		</div>
	</div>
</template>

<script lang="ts" setup>
// import ElTableColumn from 'element-plus/es/components/table/src/tableColumn.mjs';
import ElTableItem from './el-table-item.vue'
import { reactive, computed, ref, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
	tableConfig: {
		type: Object,
		default: () => ({})
	}
})

const page = reactive({
	pageNum: 1,
	pageSize: 10
})

export interface TableConfig {
	name: string
	pageNum?: number
	pageSize?: number
	total?: number
	autoResize?: boolean
	loading: boolean
	showOverflowTooltip?: boolean
	align?: boolean
	columns?: Array<TableColumn>
	tableData?: Array<Record<string, any>>
}

export interface TableColumn {
	label?: string
	prop?: string
	width?: number
	fixed?: boolean
	align?: string
	slot?: string
	showOverflowTooltip?: boolean
	component?: any
	map?: Record<string, string>
	isEdit?: boolean
	children?: Array<TableColumn>
}

const showPagination = computed(() => {
	const { pageNum, pageSize, total } = props.tableConfig
	return !Number.isNaN(pageNum + pageSize + total)
})

const emit = defineEmits(['refresh', 'sizeChange', 'numChange'])

const sizeChange = (size: number) => {
	emit('sizeChange', size)
	page.pageSize = size
	refresh(page)
}

const currentChange = (num: number) => {
	emit('numChange', num)
	page.pageNum = num
	refresh(page)
}

onMounted(() => {
	if (props.tableConfig.autoResize !== false) {
		setTableFitPage()
		window.addEventListener('resize', setTableFitPage)
	}
})

onUnmounted(() => {
	if (props.tableConfig.autoResize !== false) {
		window.removeEventListener('resize', setTableFitPage)
	}
})

const realTable = ref(null)

defineExpose({
	realTable
})

const setTableFitPage = async () => {
	await nextTick()
	// TODO: 这里需要其他高度
	// const nav = document.querySelector('.search-wraper')
	// const NavH = nav && nav.getBoundingClientRect().height
	// 可视高度 - 固定头部 - padding*2 - 搜索栏高度 - 搜索栏的margin-bottom - main 的内边距*2 - 分页的高度(32+16)
	// props.tableConfig.tableHeight = window.innerHeight - (props.tableConfig.otherHeight || 350)

	// this.$set(
	//   props.tableConfig,
	//   'tableHeight',
	//   window.innerHeight - (props.tableConfig.otherHeight || 350)
	// )

	// console.log(props.tableConfig.tableHeight, '表格高度')
	realTable && realTable?.value.doLayout()
}

const refresh = (pageInfo: { pageSize: number; pageNum: number }) => {
	emit('refresh', pageInfo)
}

</script>
