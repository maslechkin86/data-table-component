using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using WebApp.Entities;

namespace WebApp.Pages
{
	public class IndexModel : PageModel
	{
		public List<Record> Records { get; private set; } = new List<Record>
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

		public void OnGet()
		{

		}
	}
}
