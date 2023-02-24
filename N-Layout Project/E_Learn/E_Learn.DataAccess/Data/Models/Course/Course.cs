using E_Learn.DataAccess.Data.Models.Category;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Learn.DataAccess.Data.Models.Course
{
    public class Course
    {
        [Key]
        public string Id { get; set; }
        [Required, StringLength(55)]
        public string Name { get; set; }
        [ForeignKey("Category")]
        public string CategoryId { get; set; }
        public virtual Category.Category Category { get; set; }
    }
}
