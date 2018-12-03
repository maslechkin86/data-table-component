using System.Collections.Generic;

namespace WebApp.Models
{

	public class TabulatorAjaxPostModel
	{
		public int page { get; set; }

		public int size { get; set; }

		public List<TabulatorSortItem> sorters { get; set; }

		public List<TabulatorFilterItem> filters { get; set; }

	}

	public class TabulatorFilterItem
	{
		public string field { get; set; }

		public string type { get; set; }

		public string value { get; set; }
	}

	public class TabulatorSortItem
	{
		public string column { get; set; }

		public string field { get; set; }

		public string dir { get; set; }
	}

}
