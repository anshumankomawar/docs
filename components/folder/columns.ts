import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import type { File } from "@/components/folder/payments";
import DropdownAction from "@/components/folder/data-table-dropdown.vue";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, ChevronDown } from "lucide-vue-next";
import { Button } from "../ui/button";

export const columns: ColumnDef<File>[] = [
	{
		id: "select",
		header: ({ table }) =>
			h(Checkbox, {
				checked: table.getIsAllPageRowsSelected(),
				"onUpdate:checked": (value: boolean) =>
					table.toggleAllPageRowsSelected(!!value),
				ariaLabel: "Select all",
			}),
		cell: ({ row }) =>
			h(Checkbox, {
				checked: row.getIsSelected(),
				"onUpdate:checked": (value: boolean) => row.toggleSelected(!!value),
				ariaLabel: "Select row",
			}),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "name",
		header: ({ column }) =>
			h(
				"div",
				{
					class: "text-start",
					onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
				},
				"Name",
			),
		cell: ({ row }) =>
			h(
				"div",
				{
					class: "lowercase hover:cursor-pointer hover:underline text-start",
					onClick: () => navigateTo("folder/" + row.original.id),
				},
				row.getValue("name"),
			),
	},
	{
		accessorKey: "filetype",
		header: () => h("div", { class: "text-right" }, "Type"),
		cell: ({ row }) => {
			return h("div", { class: "text-right" }, row.getValue("filetype"));
		},
	},
	{
		accessorKey: "size",
		header: () => h("div", { class: "text-right" }, "Size"),
		cell: ({ row }) => {
			const size = parseFloat(row.getValue("size"));
			return h(
				"div",
				{ class: "text-right font-medium" },
				`${size.toFixed(2)} MB`,
			);
		},
	},
	{
		accessorKey: "lastModified",
		header: () => h("div", { class: "text-right" }, "Last Modified"),
		cell: ({ row }) =>
			h("div", { class: "text-right" }, row.getValue("lastModified")),
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const payment = row.original;

			return h(
				"div",
				{ class: "relative" },
				h(DropdownAction, {
					payment,
				}),
			);
		},
	},
];
