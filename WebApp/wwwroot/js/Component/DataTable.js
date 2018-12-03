var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Component;
(function (Component) {
    var DataTable = /** @class */ (function (_super) {
        __extends(DataTable, _super);
        function DataTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DataTable.prototype.SetupFilterRow = function () {
            if (this.columns) {
                var filters = this.columns.filter(function (e) {
                    return e.filter;
                });
                if (filters.length > 0) {
                    var header = this.tableSelector.find("thead");
                    var tr = header.find("tr").first();
                    var filterTr = tr.clone();
                    filterTr.find("th").each(function (_, e) {
                        $(e).html("");
                    });
                    this.columns.forEach(function (element, index) {
                        if (element.filter) {
                            var th = filterTr.find("th:nth-child(" + (index + 1) + ")").first();
                            th.append("<input type=\"text\" class=\"form-control form-control-sm data-table__filter-input\" placeholder=\"" + element.title + "...\" />");
                        }
                    });
                    tr.before(filterTr);
                }
            }
        };
        DataTable.prototype.CustomizeDataTable = function () {
            this.container.find('div.dataTables_length').first().hide();
            this.container.find('div.dataTables_filter').first().hide();
            this.container.find('div.dataTables_paginate').addClass("float-right");
        };
        DataTable.prototype.SetBindings = function () {
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
        DataTable.prototype.Render = function (type, url, method) {
            var _this = this;
            if (url === void 0) { url = null; }
            if (method === void 0) { method = null; }
            var that = this;
            _super.prototype.Render.call(this, type, url, method);
            this.param = {
                autoWidth: false,
                fixedColumns: true,
            };
            if (this.renderType === Component.TableRenderType.FromAjax) {
                this.param.columnDefs = [];
                this.param.proccessing = true;
                this.param.serverSide = true;
                this.param.ajax = {};
                this.param.ajax.url = this.dataSourceUrl;
                this.param.ajax.type = this.requestMethod === Component.RequestMethod.GET ? "GET" : "POST";
                if (this.filterFunc) {
                    this.param.ajax.dataFilter = this.filterFunc;
                }
            }
            if (this.columns) {
                this.columns.forEach(function (element, index) {
                    var column = {};
                    column.targets = element.position;
                    column.data = element.filed;
                    column.visible = element.visible;
                    column.orderable = element.sort;
                    column.orderable = element.sort;
                    // Setup column template
                    if (_this.template && _this.renderType === Component.TableRenderType.FromAjax) {
                        column.render = function (data, type, row, meta) {
                            var columnHtml = element.template;
                            that.columns.forEach(function (e, i) {
                                columnHtml = columnHtml.replace(new RegExp("#:\\s?" + e.filed + "\\s?#", 'gi'), row[e.filed]);
                            });
                            return columnHtml;
                        };
                    }
                    if (_this.renderType === Component.TableRenderType.FromAjax) {
                        _this.param.columnDefs.push(column);
                    }
                });
            }
            this.SetupFilterRow();
            this.dataTable = this.tableSelector.DataTable(this.param);
            this.CustomizeDataTable();
            this.SetBindings();
        };
        DataTable.prototype.Refresh = function () {
            this.dataTable.ajax.reload();
        };
        DataTable.prototype.ResetFilters = function () {
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
        DataTable.prototype.SetupTemplate = function (templateContainer) {
            var _this = this;
            this.template = templateContainer.html();
            var th = $('td', $(this.template));
            th.each(function (index, e) {
                if (index < _this.columns.length) {
                    _this.columns[index].template = $(e).html();
                }
            });
        };
        return DataTable;
    }(Component.Table));
    Component.DataTable = DataTable;
})(Component || (Component = {}));
//# sourceMappingURL=DataTable.js.map