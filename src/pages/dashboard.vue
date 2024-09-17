<template>
	<div class="p-4">

		<y-tabs class="mb-10px"> </y-tabs>

		<div class="p-4 mb-[10px] w-full bg-white dark:(bg-[#1d1d1d] text-white)">
			<y-table :tableConfig="tableConfig" @refresh="setPageInfo">
				<template #operateTpl="{ row }">
					<el-link type="primary" @click="remove(row)">删除</el-link>
				</template>
			</y-table>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import yTable from '../components/y-table/src/y-table.vue';
import yTabs from '../components/y-tabs/src/y-tabs.vue';

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
		{ label: '编号', prop: 'code', minWidth: 100 },
		{ label: '种类', prop: 'id', minWidth: 80 },
		{ label: '位置', prop: 'age', minWidth: 80 },
		{ label: '其它', slot: 'operateTpl', minWidth: 80 },
	]
})

function makeFakeData(params: { pageSize?: any; pageNum?: any; total?: any; dutation?: any; }) {
	return new Promise(resolve => {
		setTimeout(() => {
			const data: any = []
			for (let index = 0; index < (params.total || 12); index++) {
				data.push({
					name: '测试数据 ' + index,
					id: index,
					code: (Math.random() * 10000).toFixed(0),
					age: (Math.random() * 100).toFixed(0),
				})
			}
			resolve(data)
		}, 500 || params.dutation)
	})
}

const init = async (page?: { pageSize: number; pageNum: number }) => {
	const params = {
		...page
	}
	tableConfig.loading = true
	const data: any = await makeFakeData(params)
	tableConfig.tableData = data
	tableConfig.loading = false
	tableConfig.total = tableConfig.tableData.length
}

const setPageInfo = (page: { pageNum?: number; pageSize?: number; }) => {
	if (page) {
		tableConfig.pageNum = page.pageNum
		tableConfig.pageSize = page.pageSize
	}
	init()
}

const remove = (item) => {
	console.log(item)
}

onMounted(() => {
	init()
});
</script>
<style lang="less" scoped></style>
