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
    public interface ICategoryService
    {
        Task<ServiceResponse> GetAll();
        Task<ServiceResponse> CreateAsync(CategoryDto model);
        Task<ServiceResponse> UpdateAsync(CategoryDto model);
        Task<ServiceResponse> DeleteAsync(int id);
        Task<ServiceResponse> GetByIdAsync(int id);
    }
}
