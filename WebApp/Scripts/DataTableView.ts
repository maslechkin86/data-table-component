namespace View {
	export class DataTableView {
		private readonly container: JQuery;
		private readonly table: JQuery;
		private readonly dataTable: DataTables.DataTable;

		constructor(container: JQuery, param: any) {
			this.container = container;
			this.table = container.find('table.data-table');
			//if (!this.isEmpty(param)) {
				this.dataTable = this.table.DataTable(param);
			//} else {
			//	this.dataTable = this.table.DataTable();
			//}
			this.CustomizeDataTable();
			this.SetBindings();
		}

		private isEmpty(map): boolean {
			for (var key in map) {
				if (map.hasOwnProperty(key)) {
					return false;
				}
			}
			return true;
		}

		private CustomizeDataTable(): void {
			this.container.find('div.dataTables_length').first().hide();
			this.container.find('div.dataTables_filter').first().hide();
			this.container.find('div.dataTables_paginate').addClass("float-right");
		}

		private SetBindings(): void {
			this.container.find("input.data-table__filter-input").on('keyup change', e => {
				const self = $(e.currentTarget);
				var index = self.closest('th').index();
				this.dataTable.column(index).search(self.val().toString()).draw();
			});

			this.container.find("select.data-table__filter-input").on('change', e => {
				const self = $(e.currentTarget);
				var index = self.closest('th').index();
				this.dataTable.column(index).search(self.val().toString()).draw();
			});

			this.dataTable.on("xhr.dt", () => {
			});
		}

		public Refresh(): void {
			this.dataTable.ajax.reload();
		}

		public ResetFilters(): void {
			this.container.find("input.data-table__filter-input").each((index, element) => {
				const self = $(element);
				if (self.val().length > 0) {
					self.val("");
				}
			});
			this.container.find("select.data-table__filter-input").each((index, element) => {
				const self = $(element);
				if (self.val().length > 0) {
					self.val("");
				}
			});
			this.dataTable
				.search('')
				.columns().search('')
				.draw();
		}

	}
}