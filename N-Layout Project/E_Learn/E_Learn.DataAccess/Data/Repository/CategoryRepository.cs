using E_Learn.DataAccess.Data.Context;
using E_Learn.DataAccess.Data.IRepository;
using E_Learn.DataAccess.Data.Models.Category;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// Тільки зробив запрос до БД і повернув результат!!! ЦЕ ВСЕ ШО ТРЕБА РОБИТИ В РЕПОЗИТОРІЯХ
namespace E_Learn.DataAccess.Data.Repository
{
    public class CategoryRepository : ICategoryRepository
    {        
        public async Task<List<Category>> GetAll()
        {
            using (var _context = new AppDbContext())
            {
                List<Category> result = await _context.Categories.ToListAsync();
                return result;
            }
        }
    }
}
