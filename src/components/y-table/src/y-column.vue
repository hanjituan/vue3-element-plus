<template>
    <RenderTableColumn v-bind="column" />
</template>

<script lang="tsx" setup name="YColumn">
import { useSlots } from 'vue'
import { TableColumnProps } from './y-table.vue'

const slots = useSlots()

const props = defineProps({
    column: {
        type: Object as any
    },
    align: {
        type: String,
        default: 'center'
    },
    showOverflowTooltip: {
        type: Boolean,
        default: true
    },
    defaultValue: {
        type: String,
        default: ''
    }
})

const RenderTableColumn = (column: TableColumnProps) => {
    return (
        <>
            {
                <el-table-column
                    {...column}
                    align={column.align || props.align}
                    showOverflowTooltip={column.showOverflowTooltip || props.showOverflowTooltip}
                >
                    {{
                        default: (scope: any) => {
                            if (column._children) return column._children.map((child) => RenderTableColumn(child))
                            if (column.render) return column.render(scope)
                            if (column.slot && slots[column.slot]) return slots[column.slot]!(scope)
                            return scope.row[column.prop!] || props.defaultValue
                        },
                        header: (scope: any) => {
                            if (column.header?.slot && slots[column.header.slot])
                                return slots[column.header.slot]!(scope)
                            return column.label
                        }
                    }}
                </el-table-column>
            }
        </>
    )
}
</script>
