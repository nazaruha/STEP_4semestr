using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Learn.DataAccess.Data.Models.Category
{
    public class Category
    {
        [Key]
        public string Id { get; set; }
        [Required, StringLength(maximumLength: 55)]
        public string Name { get; set; }
    }
}
