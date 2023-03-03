using E_Learn.DataAccess.Data.Context;
using E_Learn.DataAccess.Data.IRepository;
using E_Learn.DataAccess.Data.Models.Course;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Learn.DataAccess.Data.Repository
{
    public class CourseRepository : ICourseRepository
    {
        public async Task<IEnumerable<Course>> GetAllAsync()
        {
            using (var _context = new AppDbContext())
            {
                return await _context.Courses.Include(x => x.Category).ToListAsync(); // треба Include щоб об'єкт унаслідований з БД не був null
            }
        }
        public async Task<Course> GetByIdAsync(string id)
        {
            using (var _context = new AppDbContext())
            {
                var course = await _context.Courses.FirstOrDefaultAsync(c => c.Id == id);
                return course;
            }
        }
        public async Task<bool> UpdateAsync(Course model)
        {
            using(var _context = new AppDbContext())
            {
                try
                {
                    _context.Update(model);
                    await _context.SaveChangesAsync();
                    return true;
                }
                catch
                {
                    return false;
                }
            }
        }
        public async Task<bool> RemoveAsync(Course course)
        {
            using (var _context = new AppDbContext())
            {
                try
                {
                    _context.Remove(course);
                    await _context.SaveChangesAsync();
                    return true;
                }
                catch
                {
                    return false;
                }
            }
        }
        public async Task<bool> Create(Course model)
        {
            using (var _context = new AppDbContext()) 
            {
                try
                {
                    await _context.Courses.AddAsync(model);
                    await _context.SaveChangesAsync();
                    return true;
                }
                catch
                {
                    return false;
                }
                
            }
        }
        public bool ClearCategoryId(string categoryId) 
        {
            using (var _context = new AppDbContext())
            {
                try
                {
                    var courses = _context.Courses.Where(c => c.CategoryId == categoryId);
                    foreach (var course in courses)
                    {
                        course.CategoryId = null;
                    }
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
