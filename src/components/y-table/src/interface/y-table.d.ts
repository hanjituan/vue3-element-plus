import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import type { TableInstance } from "element-plus/es/components/table/src/instance";

export interface TableConfig {
	name?: string;
	tableData: any[];
	columns: TableColumnProps[];
	loading?: boolean;
	tableHeight?: number;
	otherHeight?: number;
	align?: "left" | "center" | "right";
	showOverflowTooltip?: boolean;
	defaultValue?: string;
	// 分页相关
	pageNum?: number;
	pageSize?: number;
	total?: number;
	// 自动调整大小
	autoResize?: boolean;
}

// 扩展 TableColumnProps，继承 Element Plus 的类型
export interface TableColumnProps extends Partial<TableColumnCtx<any>> {
	vif?: boolean;
	slot?: string;
	render?: (scope: any) => any;
	header?: {
		slot?: string;
	};
	children?: TableColumnProps[];
}

// 使用 Element Plus 的表格实例类型
export interface YTableInstance extends Partial<TableInstance> {
	realTable: any;
	clearSelection: () => void;
	toggleRowSelection: (row: any, selected?: boolean) => void;
	toggleAllSelection: () => void;
	toggleRowExpansion: (row: any, expanded?: boolean) => void;
	setCurrentRow: (row: any) => void;
	clearSort: () => void;
	clearFilter: (columnKeys?: string[]) => void;
	doLayout: () => void;
	sort: (prop: string, order: string) => void;
}
