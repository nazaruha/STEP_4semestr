using E_Learn.DataAccess.Data.Context;
using E_Learn.DataAccess.Data.IRepository;
using E_Learn.DataAccess.Data.Models.Categories;
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
        public async Task<List<Category>> GetAllAsync()
        {
            using (var _context = new AppDbContext())
            {
                List<Category> result = await _context.Categories.ToListAsync();
                return result;
            }
        }
        public async Task<Category> GetByIdAsync(string id)
        {
            using (var _context = new AppDbContext())
            {
                Category result = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
                return result;
            }
        }
        public async Task<bool> GetIsNameExistAsync(string name)
        {
            using (var _context = new AppDbContext())
            {
                return await _context.Categories.AnyAsync(c => c.Name == name);
            }
        }
        public bool UpdateCategory(Category model)
        {
            using (var _context = new AppDbContext())
            {
                try
                {
                    _context.Update(model);
                    _context.SaveChanges();
                    return true;
                }
                catch
                {
                    return false;
                }
            }
        }
        public bool RemoveCategory(Category model)
        {
            using (var _context = new AppDbContext())
            {
                try
                {
                    _context.Remove(model);
                    _context.SaveChanges();
                    return true;
                }
                catch
                {
                    return false;
                }
            }
        }
        public bool AddCategory(Category model)
        {
            using (var _context = new AppDbContext())
            {
                try
                {
                    _context.Add(model);
                    _context.SaveChanges();
                    return true;
                }
                catch
                {
                    return false;
                }
            }
        }
    }
}
