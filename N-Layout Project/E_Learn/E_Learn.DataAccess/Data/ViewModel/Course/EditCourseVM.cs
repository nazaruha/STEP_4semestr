using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Learn.DataAccess.Data.ViewModel.Course
{
    public class EditCourseVM
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string? Image { get; set; } = string.Empty; // image name може бути пустим (тобто не вибрали фотку)
        public string CategoryId { get; set; } = string.Empty;
        public IFormFileCollection Files { get; set; } // колекція файлів які ми приймаємо 
    }
}
