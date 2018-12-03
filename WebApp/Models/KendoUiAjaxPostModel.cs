namespace WebApp.Models
{

	public class KendoUiAjaxPostModel
	{
		public int take { get; set; }

		public int skip { get; set; }

		public int page { get; set; }

		public int pageSize { get; set; }

		public string sort { get; set; }

	}

	public class KendoUiSortColumn
	{
		public string field { get; set; }

		public string dir { get; set; }
	}

}
