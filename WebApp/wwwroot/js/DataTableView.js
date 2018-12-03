var View;
(function (View) {
    var DataTableView = /** @class */ (function () {
        function DataTableView(container, param) {
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
        DataTableView.prototype.isEmpty = function (map) {
            for (var key in map) {
                if (map.hasOwnProperty(key)) {
                    return false;
                }
            }
            return true;
        };
        DataTableView.prototype.CustomizeDataTable = function () {
            this.container.find('div.dataTables_length').first().hide();
            this.container.find('div.dataTables_filter').first().hide();
            this.container.find('div.dataTables_paginate').addClass("float-right");
        };
        DataTableView.prototype.SetBindings = function () {
            var _this = this;
            this.container.find("input.data-table__filter-input").on('keyup change', function (e) {
                var self = $(e.currentTarget);
                var index = self.closest('th').index();
                _this.dataTable.column(index).search(self.val().toString()).draw();
            });
            this.container.find("select.data-table__filter-input").on('change', function (e) {
                var self = $(e.currentTarget);
                var index = self.closest('th').index();
                _this.dataTable.column(index).search(self.val().toString()).draw();
            });
            this.dataTable.on("xhr.dt", function () {
            });
        };
        DataTableView.prototype.Refresh = function () {
            this.dataTable.ajax.reload();
        };
        DataTableView.prototype.ResetFilters = function () {
            this.container.find("input.data-table__filter-input").each(function (index, element) {
                var self = $(element);
                if (self.val().length > 0) {
                    self.val("");
                }
            });
            this.container.find("select.data-table__filter-input").each(function (index, element) {
                var self = $(element);
                if (self.val().length > 0) {
                    self.val("");
                }
            });
            this.dataTable
                .search('')
                .columns().search('')
                .draw();
        };
        return DataTableView;
    }());
    View.DataTableView = DataTableView;
})(View || (View = {}));
//# sourceMappingURL=DataTableView.js.map