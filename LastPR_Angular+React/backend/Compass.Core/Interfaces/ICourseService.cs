using Compass.Core.DTO_s;
using Compass.Core.Entities;
using Compass.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Core.Interfaces
{
    public interface ICourseService
    {
        Task<ServiceResponse> GetAll();
        Task<ServiceResponse> CreateAsync(CourseDto model);
        Task<ServiceResponse> UpdateAsync(CourseDto model);
        Task<ServiceResponse> DeleteAsync(int id);
    }
}
