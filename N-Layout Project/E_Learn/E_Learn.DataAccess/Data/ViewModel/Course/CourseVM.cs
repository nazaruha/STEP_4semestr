using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using E_Learn.DataAccess.Data.Models.Categories;
using Microsoft.AspNetCore.Http;

namespace E_Learn.DataAccess.Data.ViewModel.Course
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
