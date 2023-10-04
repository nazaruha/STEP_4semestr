using AutoMapper;
using Compass.Core.DTO_s;
using Compass.Core.Entities;
using Compass.Core.Entities.Specification;
using Compass.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Core.Services
{
    public class CourseService: ICourseService
    {
        private readonly IRepository<Course> _courseRepo;
        private readonly IMapper _mapper;

        public CourseService(IRepository<Course> courseRepo, IMapper mapper)
        {
            _courseRepo = courseRepo;
            _mapper = mapper;
        }

        public async Task<ServiceResponse> GetAll()
        {
            var result = await _courseRepo.GetListBySpec(new CourseSpecification.GetAll());
            return new ServiceResponse
            {
                Success = true,
                Message = "Courses are loaded!",
                Payload = _mapper.Map<List<CourseDto>>(result)
            };
        }

        public async Task<ServiceResponse> CreateAsync(CourseDto model)
        {
            var mappedCourse = _mapper.Map<Course>(model);
            try
            {
                await _courseRepo.Insert(mappedCourse);
                await _courseRepo.Save();
                return new ServiceResponse
                {
                    Success = true,
                    Message = "Course's been created!",
                    Payload = mappedCourse
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

        public async Task<ServiceResponse> UpdateAsync(CourseDto model)
        {
            Course course = await _courseRepo.GetByID(model.Id);
            if (course == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "Course's not found"
                };
            }
            course.Title = model.Title;
            course.Description = model.Description;
            course.Price = model.Price;
            course.ImagePath = model.ImagePath;
            course.CategoryId = model.CategoryId;
            try
            {
                await _courseRepo.Update(course);
                await _courseRepo.Save();
                return new ServiceResponse
                {
                    Success = true,
                    Message = $"Course #{model.Id} has been updated",
                    Payload = model
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
            await _courseRepo.Delete(id);
            await _courseRepo.Save();
            return new ServiceResponse
            {
                Success = true,
                Message = "Category has been deleted"
            };
        }
    }
}
