using AutoMapper;
using Compass.Core.DTO_s;
using Compass.Core.Entities;
using Compass.Core.Entities.Specification;
using Compass.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.Xml;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Core.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IRepository<Category> _categoryRepo;
        private readonly IRepository<Course> _courseRepo;
        private readonly IMapper _mapper;
        public CategoryService(IRepository<Category> categoryRepo, IRepository<Course> courseRepo, IMapper mapper)
        {
            _categoryRepo = categoryRepo;
            _mapper = mapper;
            _courseRepo = courseRepo;
        }
        public async Task<ServiceResponse> GetAll()
        {
            var result = await _categoryRepo.GetAll();
            return new ServiceResponse
            {
                Success = true,
                Message = "Categories are loaded!",
                Payload = _mapper.Map<List<Category>>(result)
            };
        }

        public async Task<ServiceResponse> CreateAsync(CategoryDto model)
        {
            try
            {
                var mappedCategory = _mapper.Map<Category>(model);
                await _categoryRepo.Insert(mappedCategory);
                await _categoryRepo.Save();
                return new ServiceResponse
                {
                    Success = true,
                    Message = "Category's been created",
                    Payload = mappedCategory
                };
            }
            catch (Exception ex)
            {

                return new ServiceResponse
                {
                    Success = false,
                    Message = ex.Message
                };
            }
            
        }

        public async Task<ServiceResponse> UpdateAsync(CategoryDto model)
        {
            Category category = await _categoryRepo.GetByID(model.Id);
            if (category == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "Category with current id doesn't exist"
                };
            }
            try
            {
                category.Name = model.Name;
                category.Description = model.Description;
                await _categoryRepo.Update(category);
                await _categoryRepo.Save();
                return new ServiceResponse
                {
                    Success = true,
                    Message = "Category's been updated"
                };
            }
            catch (Exception ex)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = ex.Message
                };
            }
        }

        public async Task<ServiceResponse> DeleteAsync(int id)
        {
            Category category = await _categoryRepo.GetByID(id);
            if (category == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "Category with current id doesn't exist"
                };
            }
            try
            {
                var courses = await _courseRepo.GetListBySpec(new CourseSpecification.ByCategoryId(id));
                if (courses.Any())
                {
                    courses.ToList().ForEach(course => { course.CategoryId = null; });
                    await _courseRepo.Save();
                }
                await _categoryRepo.Delete(id);
                await _categoryRepo.Save();
                return new ServiceResponse
                {
                    Success = true,
                    Message = "Category's been deleted"
                };
            }
            catch (Exception ex)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = ex.Message
                };
            }
        }
        public async Task<ServiceResponse> GetByIdAsync(int id)
        {
            Category category = await _categoryRepo.GetByID(id);
            if (category == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "Category not found by Id",
                };
            }
            return new ServiceResponse
            {
                Success = true,
                Message = "Category has been found by Id",
                Payload = category
            };
        }
    }
}
