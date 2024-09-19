// TODO: 待完善, 取elment-ui的table-columns 的属性. 来完善
export interface TableConfig {
  name: string
  pageNum?: number
  pageSize?: number
  total?: number
  autoResize?: boolean
  loading: boolean
  showOverflowTooltip?: boolean
  align?: boolean
  columns?: Array<TableColumnProps>
  tableData?: Array<Record<string, any>>
}

export interface TableColumnProps {
  selectable?: Function // 仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选 (row: any, index: number) => boolean
  type?: string
  label?: string
  prop?: string
  width?: number | string
  fixed?: boolean | string
  align?: string
  slot?: string
  showOverflowTooltip?: boolean
  component?: any
  map?: Record<string, string>
  isEdit?: boolean
  vif?: boolean
  header?: any
  render?: (scope: any) => any
  _children?: Array<TableColumnProps>
}
