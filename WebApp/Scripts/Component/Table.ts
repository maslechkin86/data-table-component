namespace Component {

	export interface LooseObject {
		[key: string]: any
	}

	export enum RequestMethod {
		GET = 0,
		POST = 1
	}

	export enum TableRenderType {
		FromHtml = 0,
		FromAjax = 1
	}

	export interface ITableColumn {
		filed: string;
		title: string;
		visible: boolean;
		sort: boolean;
		filter: boolean;
		width: number;
		minWidth: number;
		position: number;
		template: string;
	}

	export interface DataFilterFunc {
		(data: any): any;
	}

	export class TableColumn implements Component.ITableColumn {

		constructor(
			public filed: string,
			public title: string,
			public visible: boolean = true,
			public sort: boolean = true,
			public filter: boolean = false,
			public width: number = -1,
			public minWidth: number = -1,
			public position: number = -1,
			public template: string = null
		) {
		}

	}

	export class Table {
		protected readonly container: JQuery;
		protected readonly columns: Component.TableColumn[];
		protected renderType: Component.TableRenderType;
		protected dataSourceUrl: string;
		protected tableSelector: JQuery;
		protected requestMethod: Component.RequestMethod;
		protected filterFunc: DataFilterFunc;

		constructor(container: JQuery, columns: Component.TableColumn[], filterFunc: DataFilterFunc = null) {
			this.container = container;
			this.columns = columns;
			this.filterFunc = filterFunc;
			if (this.columns) {
				this.columns.forEach((element: Component.TableColumn, index: number) => {
					if (element.position < 0) {
						element.position = index;
					}
				});
			}
		}

		public Render(type: Component.TableRenderType, url: string = null,
			method: Component.RequestMethod = null): void {
			this.renderType = type;
			this.tableSelector = this.container.find('table.data-table');
			this.dataSourceUrl = url;
			this.requestMethod = method;
		}

		public RenderFromHtml() {
			this.Render(Component.TableRenderType.FromHtml);
		}

		public RenderFromAjax(url: string, method: Component.RequestMethod = Component.RequestMethod.GET) {
			this.Render(Component.TableRenderType.FromAjax, url, method);
		}

	}

}