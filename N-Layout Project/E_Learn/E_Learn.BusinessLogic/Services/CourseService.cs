using AutoMapper;
using E_Learn.DataAccess.AutoMapper.Courses;
using E_Learn.DataAccess.Data.Context;
using E_Learn.DataAccess.Data.IRepository;
using E_Learn.DataAccess.Data.Models.Course;
using E_Learn.DataAccess.Data.ViewModel.Course;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore.Query.Internal;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Learn.BusinessLogic.Services
{
    public class CourseService
    {
        private readonly IConfiguration _configuration; // щоб доступитись до appsettings.js, що знаходиться в Web проекті
        private readonly IWebHostEnvironment _webHostEnvironment; // щоб доступатись до wwwroot в Web проекті
        private readonly IMapper _mapper;
        private readonly ICourseRepository _courseRepository;

        public CourseService(IConfiguration configuration, IWebHostEnvironment webHostEnvironment, IMapper mapper, ICourseRepository courseRepository)
        {
            _configuration = configuration;
            _webHostEnvironment = webHostEnvironment;
            _mapper = mapper;
            _courseRepository = courseRepository;
        }

        public async Task<ServiceResponse> GetCoursesAsync()
        {
            IEnumerable<Course> courses = await _courseRepository.GetAllAsync();
            if (courses == null)
            {
                return new ServiceResponse
                {
                    Message = "Courses are not loaded.",
                    Success = false
                };
            }
            List<CourseVM> coursesVM = courses.Select(c => _mapper.Map<Course, CourseVM>(c)).ToList();
            return new ServiceResponse
            {
                Message = "Courses are loaded.",
                Success = true,
                Payload = coursesVM
            };
        }
        public async Task<ServiceResponse> AddCourseAsync(AddCourseVM model)
        {
            if (model.Files != null)
            {
                string webPathRoot = _webHostEnvironment.WebRootPath; // шлях wwwroota
                var files = model.Files;
                string upload = webPathRoot + _configuration.GetValue<string>("ImageSettings:CourseImagePath"); // уже вписали шлях який нам треба для збереження фотки
                string fileName = Path.GetRandomFileName(); // creates random file name. Although you can use Guid.NewGuid().ToString();
                string extension = Path.GetExtension(files[0].FileName); // gets extension of file
                // зробити перевірку на extension
                using(var fileStream = new FileStream(Path.Combine(upload/*where to*/, fileName + extension/*what past*/), FileMode.Create))
                {
                    await files[0].CopyToAsync(fileStream); // записуємо в wwwroot/images/course нашу фотку
                }
                model.Image = fileName + extension; // записали ім'я фотки з типом в модель нашу
            }
            else
            {
                string upload = _webHostEnvironment.WebRootPath + _configuration.GetValue<string>("ImageSettings:EmptyImagePath");
                model.Image = upload;
            }
            model.Id = Guid.NewGuid().ToString();
            var mappedCourse = _mapper.Map<AddCourseVM, Course>(model);
            var result = await _courseRepository.Create(mappedCourse);
            if (!result)
            {
                return new ServiceResponse
                {
                    Message = "User couldn't be created.",
                    Success = false
                };
            }
            return new ServiceResponse
            {
                Message = "User is creted.",
                Success = true,
            };
        }
    }
}
