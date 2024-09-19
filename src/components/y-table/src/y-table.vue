<template>
  <div
    class="bg-[var(--el-color-white)] dark:(bg-[var(--el-bg-color)] border-[var(--el-border-color)] border-1px) rounded-sm"
  >
    <!-- 表头基础样式 background: '#f5f7fa', height: '40px'  -->
    <el-table
      ref="realTable"
      :data="tableConfig.tableData"
      :key="tableConfig.name"
      :height="tableConfig.tableHeight"
      :header-cell-style="customHeaderStyle"
      v-loading="tableConfig.loading"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
      v-bind="$attrs"
    >
      <slot></slot>

      <template v-for="column in tableConfig.columns.filter((i) => i.vif !== false)">
        <el-table-column
          v-if="column.type == 'index'"
          :key="column.prop + column.label"
          v-bind="{ ...column, slot: undefined }"
          :align="column.align || tableConfig.align"
          :showOverflowTooltip="column.showOverflowTooltip || tableConfig.showOverflowTooltip"
        />

        <el-table-column
          v-else-if="column.type == 'selection'"
          :key="column.prop + column.label + 'selection'"
          v-bind="{ ...column, slot: undefined }"
          :align="column.align || tableConfig.align"
          :showOverflowTooltip="column.showOverflowTooltip || tableConfig.showOverflowTooltip"
        />

        <YColumn
          v-else
          :key="column.prop + column.label + 'else'"
          :column="column"
          :showOverflowTooltip="tableConfig.showOverflowTooltip"
          :align="tableConfig.align"
          :defaultValue="tableConfig.defaultValue"
        >
          <template v-for="slot in Object.keys($slots)" #[slot]="scope">
            <slot :name="slot" v-bind="scope"></slot>
          </template>
        </YColumn>
      </template>

      <slot name="suffix-column"></slot>

      <template #empty>
        <slot name="empty" v-if="$slots.empty"></slot>

        <div class="flex flex-wrap justify-center" v-else>
          <img
            class="h-48"
            src="https://imagecdn.ymm56.com/ymmfile/static/resource/1278ac47-6d98-4535-be8e-19b4a82f68fd.png"
            alt=""
          />
          <span class="w-full">暂无数据</span>
        </div>
      </template>
    </el-table>

    <div class="flex justify-between mt-4" v-if="showPagination">
      <div>
        <slot name="pageStart"></slot>
      </div>
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="tableConfig.pageNum"
        :page-size="tableConfig.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableConfig.total"
        background
      >
        >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts" setup>
import YColumn from './y-column.vue'
import { computed, reactive, onMounted, onUnmounted, nextTick, ref } from 'vue'

const customHeaderStyle = {
  background: '#EBF0F7',
  height: '48px',
  color: '#3B464B'
}

const showPagination = computed(() => {
  const { pageNum, pageSize, total } = props.tableConfig
  return !Number.isNaN(pageNum + pageSize + total)
})

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

const emit = defineEmits(['refresh', 'sizeChange', 'numChange', 'inputBlur'])

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

// const inputBlur = (row, column) => {
//   emit('inputBlur', row, column)
// }

const realTable = ref(null)

defineExpose({
  realTable
  // TODO: 待完善, 将 table的ref 暴漏出去
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
