using E_Learn.DataAccess.Data.Models.Categories;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Learn.DataAccess.Data.Models.Course
{
    public class Course
    {
        [Key]
        public string Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public decimal Price { get; set; }
        public string? Image { get; set; }

        [ForeignKey("Category"), AllowNull()]
        public string? CategoryId { get; set; }
        public virtual Category? Category { get; set; } 
    }
}
