<template>
	<template v-for="column in columns">

		<!-- 多级表头 -->
		<el-table-column v-if="column.children" :label="column.label" :align="column.align || align"
			:showOverflowTooltip="column.showOverflowTooltip || showOverflowTooltip">
			<template #default>
				<ElTableItem :columns="column.children"></ElTableItem>
			</template>

		</el-table-column>

		<!-- 一级表头 -->
		<el-table-column v-else-if="column.type == 'index'" :key="column.prop + column.label"
			v-bind="{ ...column, slot: undefined }" :align="column.align || align"
			:showOverflowTooltip="column.showOverflowTooltip || showOverflowTooltip" />

		<el-table-column v-else-if="column.type == 'selection'" :key="column.prop + column.label + 'selection'"
			v-bind="{ ...column, slot: undefined }" :align="column.align || align"
			:showOverflowTooltip="column.showOverflowTooltip || showOverflowTooltip" />

		<el-table-column v-else :key="column.prop + column.label + 'else'" v-bind="{ ...column, slot: undefined }"
			:align="column.align || align" :showOverflowTooltip="column.showOverflowTooltip || showOverflowTooltip">
			<!-- 自定义头部 -->
			<template #header="scope">
				<template v-if="column.header && column.header.slot">
					<slot :name="column.header.slot" :row="scope.row"></slot>
				</template>

				<span v-else> {{ column.label }}</span>
			</template>

			<!-- 自定义列内容(列) -->
			<template #default="scope">

				<template v-if="column.slot">
					<slot :name="column.slot" v-bind="{ ...scope }"></slot>
				</template>

				<template v-else-if="column.component">
					<component :is="column.component" v-bind="{ ...scope }" :column="column" />
				</template>

				<template v-else-if="column.map">
					<span>{{ column.map[scope.row[column.prop]] }}</span>
				</template>

				<template v-else-if="scope.row.isEdit && column.isEdit">
					<el-input v-model="scope.row[column.prop]" />
				</template>

				<template v-else>
					<span> {{ scope.row[column.prop] }} </span>
				</template>

			</template>
		</el-table-column>

	</template>
</template>

<script lang="ts">

import { defineComponent, reactive } from 'vue'
// import ElTableColumn from 'element-plus/es/components/table/src/tableColumn.mjs';

export default defineComponent({
	name: 'ElTableItem',
	props: {
		columns: {
			type: Array<any>,
			default: () => []
		},
		align: {
			type: String,
			default: 'left'
		},
		showOverflowTooltip: {
			type: Boolean,
			default: true
		}
	},
	setup(props, { emit, attrs }) {
		const state = reactive({
			isMeetingStart: false,
			activeTab: '1'
		})


		return {
			state,
		}

	},
})
</script>
<style lang="less" scoped></style>
