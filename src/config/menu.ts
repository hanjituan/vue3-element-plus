import {
	Document,
	Menu as IconMenu,
	Location,
	Setting,
} from "@element-plus/icons-vue";

export interface MenuItem {
	index: string;
	title: string;
	icon?: any;
	children?: MenuItem[];
}

export const menuItems: MenuItem[] = [
	{
		index: "1",
		title: "Navigator One",
		icon: Location,
		children: [
			{
				index: "1-1",
				title: "item one",
			},
			{
				index: "1-2",
				title: "item two",
			},
			{
				index: "1-3",
				title: "item three",
			},
			{
				index: "1-4",
				title: "item four",
				children: [
					{
						index: "1-4-1",
						title: "item one",
					},
				],
			},
		],
	},
	{
		index: "2",
		title: "Navigator Two",
		icon: IconMenu,
	},
	{
		index: "3",
		title: "Navigator Three",
		icon: Document,
	},
	{
		index: "4",
		title: "Navigator Four",
		icon: Setting,
	},
];
