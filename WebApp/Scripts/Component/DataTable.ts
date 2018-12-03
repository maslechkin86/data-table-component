namespace Component {

	export class DataTable extends Table {
		protected param: LooseObject;
		protected dataTable: DataTables.DataTable;
		protected template: string;

		private SetupFilterRow(): void {
			if (this.columns) {
				const filters = this.columns.filter((e) => {
					return e.filter;
				});
				if (filters.length > 0) {
					const header = this.tableSelector.find("thead");
					const tr = header.find("tr").first();
					var filterTr = tr.clone();
					filterTr.find("th").each((_, e) => {
						$(e).html("");
					});
					this.columns.forEach((element: Component.TableColumn, index: number) => {
						if (element.filter) {
							const th = filterTr.find(`th:nth-child(${index + 1})`).first();
							th.append(
								`<input type="text" class="form-control form-control-sm data-table__filter-input" placeholder="${element.title}..." />`);
						}
					});
					tr.before(filterTr);
				}
			}
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

		public Render(type: Component.TableRenderType,
			url: string = null,
			method: Component.RequestMethod = null) {
			let that = this;
			super.Render(type, url, method);
			this.param = {
				autoWidth: false,
				fixedColumns: true,
				//stateSave: true
			};
			if (this.renderType === Component.TableRenderType.FromAjax) {
				this.param.columnDefs = [];
				this.param.proccessing = true;
				this.param.serverSide = true;
				this.param.ajax = <LooseObject>{};
				this.param.ajax.url = this.dataSourceUrl;
				this.param.ajax.type = this.requestMethod === Component.RequestMethod.GET ? "GET" : "POST";
				if (this.filterFunc) {
					this.param.ajax.dataFilter = this.filterFunc;
				}
			}
			if (this.columns) {
				this.columns.forEach((element: Component.TableColumn, index: number) => {
					var column: LooseObject = {};
					column.targets = element.position;
					column.data = element.filed;
					column.visible = element.visible;
					column.orderable = element.sort;
					column.orderable = element.sort;

					// Setup column template
					if (this.template && this.renderType === Component.TableRenderType.FromAjax) {
						column.render = (data, type, row, meta) => {
							let columnHtml = element.template;
							that.columns.forEach((e, i) => {
								columnHtml = columnHtml.replace(new RegExp(`#:\\s?${e.filed}\\s?#`, 'gi'), row[e.filed]);
							});
							return columnHtml;
						}
					}
					if (this.renderType === Component.TableRenderType.FromAjax) {
						this.param.columnDefs.push(column);
					}
				});
			}
			this.SetupFilterRow();
			this.dataTable = this.tableSelector.DataTable(this.param);
			this.CustomizeDataTable();
			this.SetBindings();
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

		public SetupTemplate(templateContainer: JQuery): void {
			this.template = templateContainer.html();
			const th = $('td', $(this.template));
			th.each((index, e) => {
				if (index < this.columns.length) {
					this.columns[index].template = $(e).html();
				}
			});
		}

	}

}