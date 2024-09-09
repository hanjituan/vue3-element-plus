<template>
	<div class="rounded-lg w-1/2 mx-auto my-4 px-4 py-2 overflow-auto">
		<div class="border  p-4 bg-white mb-5">
			<Ytable class="mb-[10px]" :tableConfig="tableConfig" @refresh="setPageInfo" border>
				<template #operateTpl="{ row }">
					<el-link @click="remove(row)" type="primary">
						删除
					</el-link>
				</template>
			</Ytable>
		</div>

		<div class="border mb-50px">
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="date" label="Date" width="150" />

				<el-table-column label="Delivery Info">
					<el-table-column prop="name" label="Name" width="120" />
					<el-table-column label="Address Info">
						<el-table-column prop="state" label="State" width="120" />
						<el-table-column prop="city" label="City" width="120" />
						<el-table-column prop="address" label="Address" />
						<el-table-column prop="zip" label="Zip" width="120" />
					</el-table-column>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import Ytable from "./y-table/y-table.vue"

const tableData = [
	{
		date: '2016-05-03',
		name: 'Tom',
		state: 'California',
		city: 'Los Angeles',
		address: 'No. 189, Grove St, Los Angeles',
		zip: 'CA 90036',
	},
	{
		date: '2016-05-02',
		name: 'Tom',
		state: 'California',
		city: 'Los Angeles',
		address: 'No. 189, Grove St, Los Angeles',
		zip: 'CA 90036',
	},
	{
		date: '2016-05-04',
		name: 'Tom',
		state: 'California',
		city: 'Los Angeles',
		address: 'No. 189, Grove St, Los Angeles',
		zip: 'CA 90036',
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		state: 'California',
		city: 'Los Angeles',
		address: 'No. 189, Grove St, Los Angeles',
		zip: 'CA 90036',
	},
	{
		date: '2016-05-08',
		name: 'Tom',
		state: 'California',
		city: 'Los Angeles',
		address: 'No. 189, Grove St, Los Angeles',
		zip: 'CA 90036',
	},
	{
		date: '2016-05-06',
		name: 'Tom',
		state: 'California',
		city: 'Los Angeles',
		address: 'No. 189, Grove St, Los Angeles',
		zip: 'CA 90036',
	},
	{
		date: '2016-05-07',
		name: 'Tom',
		state: 'California',
		city: 'Los Angeles',
		address: 'No. 189, Grove St, Los Angeles',
		zip: 'CA 90036',
	},
]

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
		{
			label: '位置', prop: 'age', minWidth: 80,
			children: [
				{ label: '上', prop: 'top', minWidth: 80 },
				{ label: '下', prop: 'bottom', minWidth: 80 },
				{ label: '左', prop: 'left', minWidth: 80 },
				{ label: '右', prop: 'right', minWidth: 80 },
			]
		},
		{ label: '操作', slot: 'operateTpl', minWidth: 80 },
	]
})

function makeFakeData(params: any) {
	return new Promise(resolve => {
		setTimeout(() => {
			const data: any = []
			for (let index = 0; index < 12; index++) {
				data.push({
					name: '测试数据 ' + index,
					id: index,
					code: Math.random().toString(36).substring(2, 8),
					age: (Math.random() * 100).toFixed(0),
					top: (Math.random() * 100).toFixed(0),
					bottom: (Math.random() * 100).toFixed(0),
					left: (Math.random() * 100).toFixed(0),
					right: (Math.random() * 100).toFixed(0),
				})
			}
			resolve(data)
		}, 1000 || params.duration)
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

const remove = () => {
}

onMounted(() => {
	init();
})
</script>
