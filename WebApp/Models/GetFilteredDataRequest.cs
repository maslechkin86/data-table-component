using System.Collections.Generic;

namespace WebApp.Models
{

	public class GetFilteredDataRequest
	{

		public int? Take { get; set; }

		public int? Skip { get; set; }

		public string SortByColumn { get; set; }

		public bool AscendingOrder { get; set; }

		public Dictionary<string, string> Filters { get; set; }

		public class ColumnFilter
		{

			public string Column { get; set; }

			public string SearchValue { get; set; }

		}

	}

}
