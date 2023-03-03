using E_Learn.DataAccess.Data.Models.Course;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Learn.DataAccess.Data.IRepository
{
    public interface ICourseRepository
    {
        Task<IEnumerable<Course>> GetAllAsync();
        Task<Course> GetByIdAsync(string id);
        Task<bool> UpdateAsync(Course course);
        Task<bool> RemoveAsync(Course course);
        Task<bool> Create(Course model);
        bool ClearCategoryId(string categoryId);
    }
}
