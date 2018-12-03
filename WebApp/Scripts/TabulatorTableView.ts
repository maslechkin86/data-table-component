namespace View {
	export class TabulatorTableView {
		private readonly container: JQuery;
		private readonly table: JQuery;
		private readonly tabulatorTable: any;

		constructor(containerSelector: JQuery, param: any) {
			this.container = containerSelector;
			this.table = this.container.find('.tabulator-table__table');
			this.tabulatorTable = this.table.tabulator(param);
			//this.tabulatorTable = new Tabulator(".tabulator-table__table", param);
			this.SetBindings();

		}

		private SetBindings(): void {
			this.container.find(".tabulator-table__filter-input").on("keyup change", e => {
				var self = $(e.currentTarget);
				var col = self.data("column");
				//this.tabulatorTable.setFilter(col, "like", self.val());
				this.table.tabulator("setFilter", col, "like", self.val());
			});
		}

		public Download(): void {
			this.tabulatorTable.tabulator().download("csv", "data.csv");
		}

		public Refresh(): void {
			//this.dataTable.ajax.reload();
		}

		public ResetFilters(): void {
			//this.container.find("input.data-table__filter-input").each((index, element) => {
			//	const self = $(element);
			//	if (self.val().length > 0) {
			//		self.val("");
			//	}
			//});
			//this.container.find("select.data-table__filter-input").each((index, element) => {
			//	const self = $(element);
			//	if (self.val().length > 0) {
			//		self.val("");
			//	}
			//});
			//this.dataTable
			//	.search('')
			//	.columns().search('')
			//	.draw();
		}

	}
}