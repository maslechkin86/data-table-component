var View;
(function (View) {
    var MyView = /** @class */ (function () {
        function MyView() {
            this.dateTimeFormat = "YYYY-MM-DD HH:mm";
            this.dataTable1 = this.InitializeDataTable($(".data-table-view"));
            this.dataTable2 = this.InitializeDataTableFromHtml($(".data-table-view2"));
            this.tabulatorTable1 = this.InitializeTabulator($(".tabulator-table"));
            this.tabulatorTable2 = this.InitializeTabulatorFromHtml(".tabulator-table2");
        }
        MyView.prototype.InitializeDataTableFromHtml = function (container) {
            var columns = [
                new Component.TableColumn("id", "Id", true, true, true),
                new Component.TableColumn("timestamp", "Timestamp"),
                new Component.TableColumn("status", "Status"),
                new Component.TableColumn("text", "Text", true, true, true)
            ];
            var component = new Component.DataTable(container, columns);
            component.RenderFromHtml();
            return component;
        };
        MyView.prototype.InitializeDataTable = function (container) {
            var _this = this;
            var columns = [
                new Component.TableColumn("id", "Id", true, true, true),
                new Component.TableColumn("timestamp", "Timestamp"),
                new Component.TableColumn("status", "Status"),
                new Component.TableColumn("text", "Text", true, true, true)
            ];
            var component = new Component.DataTable(container, columns, function (data) {
                var json = jQuery.parseJSON(data);
                json.aaData.forEach(function (v, i) {
                    v.timestamp = moment(v.timestamp).format(_this.dateTimeFormat);
                });
                return JSON.stringify(json);
            });
            component.SetupTemplate($("#rowTemplate"));
            component.RenderFromAjax("/home/list", Component.RequestMethod.POST);
            //var that = this;
            //const param = {
            //	"autoWidth": false,
            //	"proccessing": true,
            //	"serverSide": true,
            //	"fixedColumns": true,
            //	"stateSave": true,
            //	"ajax": {
            //		"url": "/home/list",
            //		"type": 'POST'
            //	},
            //	"columnDefs": [
            //		{
            //			"targets": 0,
            //			"data": "id",
            //			"render"(data, type, row: Interfaces.IRecord, meta) {
            //				const html = `<a href="/devices/edit/${row.id}">${row.id}</a>`;
            //				return html;
            //			}
            //		},
            //		{
            //			"targets": 1,
            //			"data": "timestamp",
            //			"render"(data, type, row: Interfaces.IRecord, meta) {
            //				const html = moment(row.timestamp).format(that.dateTimeFormat);
            //				return html;
            //			}
            //		},
            //		{
            //			"targets": 2,
            //			"data": "status",
            //			"render"(data, type, row: Interfaces.IRecord, meta) {
            //				const html = row.status === "1" ? "Status 1" : "Status 0";
            //				return html;
            //			}
            //		},
            //		{
            //			"targets": 3,
            //			"data": "text",
            //			"render"(data, type, row: Interfaces.IRecord, meta) {
            //				const html = row.text;
            //				return html;
            //			}
            //		}
            //	],
            //	"order": [[0, 'desc']],
            //};
            return component;
        };
        MyView.prototype.InitializeTabulator = function (container) {
            var tabulatorTable = new View.TabulatorTableView(container, {
                height: 400,
                ajaxFiltering: true,
                ajaxSorting: true,
                pagination: "remote",
                ajaxURL: "/home/list2",
                ajaxConfig: "POST",
                paginationSize: 5,
                layout: "fitColumns",
                selectable: true,
                selectablePersistence: true,
                responsiveLayout: "hide",
                columns: [
                    {
                        title: "Id",
                        field: "id",
                        minWidth: 200,
                        responsive: 0,
                        formatter: function (cell, formatterParams, onRendered) {
                            var html = "<a href=\"/devices/edit/" + cell.getValue() + "\">" + cell.getValue() + "</a>";
                            return html;
                        }
                    },
                    {
                        title: "Timestamp",
                        field: "timestamp",
                        formatter: "datetime",
                        responsive: 1,
                        minWidth: 200,
                        formatterParams: {
                            inputFormat: "YYYY-MM-DD HH:mm",
                            outputFormat: "YYYY-MM-DD HH:mm",
                            invalidPlaceholder: "(invalid date)"
                        }
                    },
                    {
                        title: "Status",
                        field: "status",
                        responsive: 2,
                        minWidth: 200,
                        formatter: function (cell, formatterParams, onRendered) {
                            var html = cell.getValue().toString() === "1" ? "Status 1" : "Status 0";
                            return html;
                        }
                    },
                    {
                        title: "Text",
                        field: "text",
                        responsive: 3,
                        minWidth: 200
                    }
                ],
                ajaxResponse: function (url, params, response) {
                    //url - the URL of the request
                    //params - the parameters passed with the request
                    //response - the JSON object returned in the body of the response.
                    return response; //return the tableData property of a response json object
                }
            });
            return tabulatorTable;
        };
        MyView.prototype.InitializeTabulatorFromHtml = function (container) {
            var tabulatorTable = new Tabulator(container, {
                pagination: "local",
                paginationSize: 5,
                persistenceMode: "cookie",
                selectable: true,
                selectablePersistence: true,
                layout: "fitColumns",
                columns: [
                    {
                        width: 100,
                        title: "Id",
                        field: "id",
                        headerFilter: true
                    },
                    {
                        width: 200,
                        title: "Timestamp",
                        field: "timestamp",
                        formatter: "datetime",
                        formatterParams: {
                            inputFormat: "YYYY-MM-DD HH:mm",
                            outputFormat: "YYYY-MM-DD HH:mm",
                            invalidPlaceholder: "(invalid date)"
                        }
                    },
                    {
                        width: 200,
                        title: "Status",
                        field: "status",
                        headerFilter: true
                    },
                    {
                        width: 300,
                        title: "Text",
                        field: "text",
                        headerFilter: true
                    }
                ]
            });
            tabulatorTable.redraw();
            $(".tabulator-table__download-btn").click(function (e) {
                e.preventDefault();
                tabulatorTable.download("csv", "data.csv");
            });
            return tabulatorTable;
        };
        return MyView;
    }());
    View.MyView = MyView;
})(View || (View = {}));
//# sourceMappingURL=MyView.js.map