var View;
(function (View) {
    var TabulatorTableView = /** @class */ (function () {
        function TabulatorTableView(containerSelector, param) {
            this.container = containerSelector;
            this.table = this.container.find('.tabulator-table__table');
            this.tabulatorTable = this.table.tabulator(param);
            //this.tabulatorTable = new Tabulator(".tabulator-table__table", param);
            this.SetBindings();
        }
        TabulatorTableView.prototype.SetBindings = function () {
            var _this = this;
            this.container.find(".tabulator-table__filter-input").on("keyup change", function (e) {
                var self = $(e.currentTarget);
                var col = self.data("column");
                //this.tabulatorTable.setFilter(col, "like", self.val());
                _this.table.tabulator("setFilter", col, "like", self.val());
            });
        };
        TabulatorTableView.prototype.Download = function () {
            this.tabulatorTable.tabulator().download("csv", "data.csv");
        };
        TabulatorTableView.prototype.Refresh = function () {
            //this.dataTable.ajax.reload();
        };
        TabulatorTableView.prototype.ResetFilters = function () {
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
        };
        return TabulatorTableView;
    }());
    View.TabulatorTableView = TabulatorTableView;
})(View || (View = {}));
//# sourceMappingURL=TabulatorTableView.js.map