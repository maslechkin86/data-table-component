using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp.Entities;
using WebApp.Models;

namespace WebApp.Controllers
{

	public class HomeController : Controller
	{

		#region Data

		private readonly List<Record> Records = new List<Record>
		{
			new Record {Id = 0, Timestamp = DateTime.Now, Text = "Text", Status = 1},
			new Record {Id = 1, Timestamp = DateTime.Now, Text = "Text", Status = 0},
			new Record {Id = 2, Timestamp = DateTime.Now, Text = "Text", Status = 1},
			new Record {Id = 3, Timestamp = DateTime.Now, Text = "Text", Status = 1},
			new Record {Id = 4, Timestamp = DateTime.Now, Text = "Text", Status = 1},
			new Record {Id = 5, Timestamp = DateTime.Now, Text = "Text", Status = 1},
			new Record {Id = 6, Timestamp = DateTime.Now, Text = "Text", Status = 1},
			new Record {Id = 7, Timestamp = DateTime.Now, Text = "Text", Status = 1},
			new Record {Id = 8, Timestamp = DateTime.Now, Text = "Text", Status = 1},
			new Record {Id = 9, Timestamp = DateTime.Now, Text = "Text", Status = 1},
			new Record {Id = 10, Timestamp = DateTime.Now, Text = "Text", Status = 1},
			new Record {Id = 11, Timestamp = DateTime.Now, Text = "Text", Status = 1},
			new Record {Id = 12, Timestamp = DateTime.Now, Text = "Text", Status = 1},
			new Record {Id = 13, Timestamp = DateTime.Now, Text = "Text", Status = 1},
			new Record {Id = 14, Timestamp = DateTime.Now, Text = "Text", Status = 1},
			new Record {Id = 15, Timestamp = DateTime.Now, Text = "Text", Status = 1},
			new Record {Id = 16, Timestamp = DateTime.Now, Text = "Text", Status = 1},
			new Record {Id = 17, Timestamp = DateTime.Now, Text = "Text", Status = 1},
			new Record {Id = 18, Timestamp = DateTime.Now, Text = "Text", Status = 1},
			new Record {Id = 19, Timestamp = DateTime.Now, Text = "Text", Status = 1},
		};

		protected GetFilteredDataRequest CreateGetFilteredDataRequest(KendoUiAjaxPostModel model, IQueryCollection query)
		{
			var request = new GetFilteredDataRequest
			{
				Skip = model.skip,
				Take = model.take,
				AscendingOrder = true,
				SortByColumn = string.Empty,
				Filters = new Dictionary<string, string>()
			};
			if (query.TryGetValue($"sort[0][field]", out var fieldVal) &&
			    query.TryGetValue($"sort[0][dir]", out var dirVal))
			{
				request.SortByColumn = fieldVal.ToString();
				request.AscendingOrder = dirVal.ToString().ToLower() == "asc";
			}

			for (var i = 0; i < 100; i++)
			{
				if (query.TryGetValue($"filter[filters][{i}][operator]", out var filterOperatorVal) &&
				    query.TryGetValue($"filter[filters][{i}][value]", out var filterValueVal) &&
				    query.TryGetValue($"filter[filters][{i}][field]", out var filterFieldVal))
				{
					request.Filters.Add(filterFieldVal.ToString(), filterValueVal.ToString());
				}
			}
			return request;
		}

		protected GetFilteredDataRequest CreateGetFilteredDataRequest(TabulatorAjaxPostModel model)
		{
			if (model.size == 0)
			{
				model.size = 10;
			}
			var request = new GetFilteredDataRequest
			{
				Skip = (model.page - 1) * model.size,
				Take = model.size,
				AscendingOrder = true,
				SortByColumn = string.Empty,
				Filters = new Dictionary<string, string>()
			};
			if (model.filters != null)
			{
				foreach (var filterItem in model.filters)
				{
					if (filterItem.value != null)
					{
						request.Filters.Add(filterItem.field, filterItem.value);
					}
				}
			}
			if (model.sorters != null && model.sorters.Any()) {
				request.SortByColumn = model.sorters[0].field;
				request.AscendingOrder = model.sorters[0].dir.ToLower() == "asc";
			}

			return request;
		}

		protected GetFilteredDataRequest CreateGetFilteredDataRequest(DataTableAjaxPostModel model)
		{
			var request = new GetFilteredDataRequest
			{
				Skip = model.start,
				Take = model.length,
				AscendingOrder = true,
				SortByColumn = string.Empty,
				Filters = new Dictionary<string, string>()
			};
			foreach (var column in model.columns) {
				if (column.search.value != null) {
					request.Filters.Add(column.data, column.search.value);
				}
			}

			if (model.order.Any()) {
				request.SortByColumn = model.columns[model.order[0].column].data;
				request.AscendingOrder = model.order[0].dir.ToLower() == "asc";
			}

			return request;
		}

		#endregion

		private List<Record> GetRecordsList(Dictionary<string, string> filters, string sortBy, bool isAscendingOrder,
			out int totalRecords, out int filteredRecords, int? take = null, int? skip = null)
		{
			var query = Records.Select(_ => _);
			totalRecords = query.Count();
			Record item;
			const StringComparison comparison = StringComparison.CurrentCultureIgnoreCase;
			if (filters != null)
			{
				foreach (var filter in filters)
				{
					var value = filter.Value;
					if (string.Equals(filter.Key, nameof(item.Text), comparison))
					{
						query = query.Where(_ => _.Text.Contains(value));
					}
					else if (string.Equals(filter.Key, nameof(item.Status), comparison))
					{
						int.TryParse(value, out var intValue);
						query = query.Where(_ => _.Status == intValue);
					}
					else if (string.Equals(filter.Key, nameof(item.Id), comparison))
					{
						int.TryParse(value, out var intValue);
						query = query.Where(_ => _.Id == intValue);
					}
				}
			}

			if (string.Equals(sortBy, nameof(item.Text), comparison))
			{
				query = isAscendingOrder ? query.OrderBy(_ => _.Text) : query.OrderByDescending(_ => _.Text);
			}
			else if (string.Equals(sortBy, nameof(item.Id), comparison))
			{
				query = isAscendingOrder ? query.OrderBy(_ => _.Id) : query.OrderByDescending(_ => _.Id);
			}
			else if (string.Equals(sortBy, nameof(item.Status), comparison))
			{
				query = isAscendingOrder ? query.OrderBy(_ => _.Status) : query.OrderByDescending(_ => _.Status);
			}
			else if (string.Equals(sortBy, nameof(item.Timestamp), comparison))
			{
				query = isAscendingOrder ? query.OrderBy(_ => _.Timestamp) : query.OrderByDescending(_ => _.Timestamp);
			}
			else
			{
				query = isAscendingOrder ? query.OrderBy(_ => _.Timestamp) : query.OrderByDescending(_ => _.Timestamp);
			}

			filteredRecords = query.Count();
			if (take.HasValue && skip.HasValue)
			{
				query = query.Skip(skip.Value).Take(take.Value);
			}

			var log = query.ToList();
			return log;
		}

		public IActionResult Index()
		{
			return View(Records);
		}

		[HttpPost]
		public JsonResult List(DataTableAjaxPostModel model)
		{
			var request = CreateGetFilteredDataRequest(model);
			var list = GetRecordsList(request.Filters, request.SortByColumn, request.AscendingOrder, out int totalRecords,
				out int filteredRecords, request.Take, request.Skip);
			return Json(new
			{
				sEcho = model.draw,
				iTotalRecords = totalRecords,
				iTotalDisplayRecords = filteredRecords,
				aaData = list
			});
		}

		[HttpPost]
		public JsonResult List2(TabulatorAjaxPostModel model)
		{
			var request = CreateGetFilteredDataRequest(model);
			var list = GetRecordsList(request.Filters, request.SortByColumn, request.AscendingOrder, out int totalRecords,
				out int filteredRecords, request.Take, request.Skip);
			return Json(new
			{
					last_page = filteredRecords / model.size,
					data = list
			});
		}

		[HttpGet]
		public JsonResult List3(KendoUiAjaxPostModel model)
		{
			var request = CreateGetFilteredDataRequest(model, Request.Query);
			var list = GetRecordsList(request.Filters, request.SortByColumn, request.AscendingOrder, out int totalRecords,
				out int filteredRecords, request.Take, request.Skip);
			return Json(new
			{
				total = filteredRecords,
				data = list
			});
		}

	}
}