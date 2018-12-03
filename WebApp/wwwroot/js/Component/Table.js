var Component;
(function (Component) {
    var RequestMethod;
    (function (RequestMethod) {
        RequestMethod[RequestMethod["GET"] = 0] = "GET";
        RequestMethod[RequestMethod["POST"] = 1] = "POST";
    })(RequestMethod = Component.RequestMethod || (Component.RequestMethod = {}));
    var TableRenderType;
    (function (TableRenderType) {
        TableRenderType[TableRenderType["FromHtml"] = 0] = "FromHtml";
        TableRenderType[TableRenderType["FromAjax"] = 1] = "FromAjax";
    })(TableRenderType = Component.TableRenderType || (Component.TableRenderType = {}));
    var TableColumn = /** @class */ (function () {
        function TableColumn(filed, title, visible, sort, filter, width, minWidth, position, template) {
            if (visible === void 0) { visible = true; }
            if (sort === void 0) { sort = true; }
            if (filter === void 0) { filter = false; }
            if (width === void 0) { width = -1; }
            if (minWidth === void 0) { minWidth = -1; }
            if (position === void 0) { position = -1; }
            if (template === void 0) { template = null; }
            this.filed = filed;
            this.title = title;
            this.visible = visible;
            this.sort = sort;
            this.filter = filter;
            this.width = width;
            this.minWidth = minWidth;
            this.position = position;
            this.template = template;
        }
        return TableColumn;
    }());
    Component.TableColumn = TableColumn;
    var Table = /** @class */ (function () {
        function Table(container, columns, filterFunc) {
            if (filterFunc === void 0) { filterFunc = null; }
            this.container = container;
            this.columns = columns;
            this.filterFunc = filterFunc;
            if (this.columns) {
                this.columns.forEach(function (element, index) {
                    if (element.position < 0) {
                        element.position = index;
                    }
                });
            }
        }
        Table.prototype.Render = function (type, url, method) {
            if (url === void 0) { url = null; }
            if (method === void 0) { method = null; }
            this.renderType = type;
            this.tableSelector = this.container.find('table.data-table');
            this.dataSourceUrl = url;
            this.requestMethod = method;
        };
        Table.prototype.RenderFromHtml = function () {
            this.Render(Component.TableRenderType.FromHtml);
        };
        Table.prototype.RenderFromAjax = function (url, method) {
            if (method === void 0) { method = Component.RequestMethod.GET; }
            this.Render(Component.TableRenderType.FromAjax, url, method);
        };
        return Table;
    }());
    Component.Table = Table;
})(Component || (Component = {}));
//# sourceMappingURL=Table.js.map