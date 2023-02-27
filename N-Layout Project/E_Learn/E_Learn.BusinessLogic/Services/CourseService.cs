using E_Learn.DataAccess.Data.Context;
using E_Learn.DataAccess.Data.IRepository;
using E_Learn.DataAccess.Data.Models.Course;
using E_Learn.DataAccess.Data.Models.ViewModel.Courses;
using Microsoft.EntityFrameworkCore.Query.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Learn.BusinessLogic.Services
{
    public class CourseService
    {
        private readonly ICourseRepository _courseRepository;

        public CourseService(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }

        public async Task<ServiceResponse> GetCoursesAsync()
        {
            IEnumerable<Course> courses = await _courseRepository.GetAllAsync();
            if (courses == null)
            {
                //List<CourseVM> coursesVM = courses.Select(c => _mapper.Map<Course, CourseVM>(c)).ToList();
                return new ServiceResponse
                {
                    Message = "Courses are not loaded.",
                    Success = false
                };
            }
            return new ServiceResponse
            {
                Message = "Courses are loaded.",
                Success = true,
                Payload = courses
            };
        }
    }
}
