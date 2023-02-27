using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using E_Learn.DataAccess.Data.Models.Categories;

namespace E_Learn.DataAccess.Data.Models.ViewModel.Courses
{
    public class CourseVM
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string ImagePath { get; set; } = string.Empty;
        public string CategoryId { get; set; } = string.Empty;
        public Category Category { get; set; }

    }
}
