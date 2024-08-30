<template>
	<div class="rounded-lg w-1/2 mx-auto my-4 px-4 py-2 overflow-auto">
		<div class="border  p-4 bg-white mb-5">
			<Ytable class="mb-[10px]" :tableConfig="tableConfig" @refresh="getTableData">
				<template #operateTpl="{ row }">
					<el-button type="text" @click="remove(row)" size="small">删除</el-button>
				</template>
			</Ytable>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import Ytable from "./y-table/index.vue"

const tableConfig = reactive<any>({
	name: 'rollInfo',
	tableData: [],
	pageNum: 1,
	pageSize: 10,
	total: 0,
	loading: false,
	autoResize: false,
	height: 400,
	otherHeight: 200,
	align: 'center',
	showOverflowTooltip: true,
	columns: [
		{ label: '序号', type: 'index', prop: 'index', minWidth: 60 },
		{ label: '轧辊编号', prop: 'code', minWidth: 100 },
		{ label: '种类', prop: 'id', minWidth: 80 },
		{ label: '位置', prop: 'value1', minWidth: 80 },
		{ label: '其它', prop: 'value1', minWidth: 80 },
	]
})

function makeFakeData(params: any) {
	return new Promise(resolve => {
		setTimeout(() => {
			const data: any = []
			for (let index = 0; index < 12; index++) {
				data.push({
					name: '测试数据测试数据测试数据测试数据测试数据测试数据测试数据 ' + index,
					id: index,
					age: (Math.random() * 100).toFixed(0),
				})
			}
			resolve(data)
		}, 2000 || params.duration)
	})
}

const init = async (page?: { pageSize: number; pageNum: number }) => {
	const params = {
		...page
	}
	tableConfig.loading = true
	const data: any = await makeFakeData(params)
	console.log(data)
	tableConfig.tableData = data
	tableConfig.loading = false
	tableConfig.total = tableConfig.tableData.length
}

const getTableData = (page) => {
	console.log(page)
	init(page)
}

const remove = (item) => {
	console.log(item)
}

onMounted(() => {
	init();
})
</script>
