using E_Learn.DataAccess.Data.Models.Category;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Learn.DataAccess.Data.IRepository
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetAll();
        bool UpdateCategory(Category model);
        bool RemoveCategory(Category model);
        bool AddCategory(Category model);
    }
}
