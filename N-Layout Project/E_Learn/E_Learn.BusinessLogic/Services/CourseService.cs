using AutoMapper;
using E_Learn.DataAccess.AutoMapper.Courses;
using E_Learn.DataAccess.Data.Context;
using E_Learn.DataAccess.Data.IRepository;
using E_Learn.DataAccess.Data.Models.Course;
using E_Learn.DataAccess.Data.ViewModel.Course;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore.Query.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Formats.Asn1;
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
        public async Task<ServiceResponse> GetCourseByIdAsync(string id)
        {
            Course course = await _courseRepository.GetByIdAsync(id);
            if (course == null)
            {
                return new ServiceResponse
                {
                    Message = "Course is not found.",
                    Success = false
                };
            }
            var mappedCourse = _mapper.Map<Course, EditCourseVM>(course);
            if (mappedCourse == null)
            {
                return new ServiceResponse
                {
                    Message = "Couldn't map the course",
                    Success = false
                };
            }
            return new ServiceResponse
            {
                Message = "Course is found",
                Success = true,
                Payload = mappedCourse
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
                string filePath = Path.Combine(upload, fileName + extension);
                // зробити перевірку на extension
                using(var fileStream = new FileStream(filePath, FileMode.Create)) // upload - where to, fileName + extension - what to paste
                {
                    files[0].CopyTo(fileStream); // записуємо в wwwroot/images/course нашу фотку
                }
                model.Image = fileName + extension; // записали ім'я фотки з типом в модель нашу
            }
            model.Id = Guid.NewGuid().ToString();
            var mappedCourse = _mapper.Map<AddCourseVM, Course>(model);
            var result = await _courseRepository.Create(mappedCourse);
            if (!result)
            {
                return new ServiceResponse
                {
                    Message = "Name is occupied or smth else.",
                    Success = false
                };
            }
            return new ServiceResponse
            {
                Message = "User is creted.",
                Success = true,
            };
        }
        public async Task<ServiceResponse> EditCourseAsync(EditCourseVM model)
        {
            Course course = await _courseRepository.GetByIdAsync(model.Id);
            if (course == null)
            {
                return new ServiceResponse
                {
                    Message = "Course couldn't be found.",
                    Success = false
                };
            }
            if (model.Files != null)
            {
                string _webRootPath = _webHostEnvironment.WebRootPath;
                var files = model.Files;
                string upload = _webRootPath + _configuration.GetValue<string>("ImageSettings:CourseImagePath");
                string fileName = Path.GetRandomFileName();
                string extension = Path.GetExtension(files[0].FileName);
                string filePath = Path.Combine(upload, fileName + extension);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    files[0].CopyTo(fileStream);
                }
                if (course.Image != null)
                    File.Delete(upload + course.Image);
                course.Image = fileName + extension;
            }
            course.Title = model.Title;
            course.Description = model.Description;
            course.Price = model.Price;
            course.CategoryId = model.CategoryId;

            var result = await _courseRepository.UpdateAsync(course);
            if (!result)
            {
                return new ServiceResponse
                {
                    Message = "Course couldn't be updated.",
                    Success = false
                };
            }
            return new ServiceResponse
            {
                Message = "Course is updated.",
                Success = true
            };
        }
        public async Task<ServiceResponse> RemoveCourseAsync(string courseId)
        {
            Course course = await _courseRepository.GetByIdAsync(courseId);
            if (course.Image != null)
                RemoveImage(course.Image);
            var result = await _courseRepository.RemoveAsync(course);
            if (result)
            {
                return new ServiceResponse
                {
                    Message = "Course is deleted.",
                    Success = true
                };
            }
            return new ServiceResponse
            {
                Message = "Course couldn't be deleted.",
                Success = false
            };
        }
        private void RemoveImage(string fileName)
        {
            string _webRootPath = _webHostEnvironment.WebRootPath;
            string imagesPath = _webRootPath + _configuration.GetValue<string>("ImageSettings:CourseImagePath");
            string filePath = imagesPath + fileName;
            File.Delete(filePath);
        }
    }
}
