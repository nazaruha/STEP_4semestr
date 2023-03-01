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
    }
}
