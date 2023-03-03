using AutoMapper;
using E_Learn.DataAccess.Data.Models.Course;
using E_Learn.DataAccess.Data.ViewModel.Course;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Learn.DataAccess.AutoMapper.Courses
{
    public class AutoMapperCourseProfile : Profile
    {
        public AutoMapperCourseProfile()
        {
            CreateMap<Course, CourseVM>().ReverseMap();
            CreateMap<Course, AddCourseVM>().ReverseMap();
            CreateMap<Course, EditCourseVM>().ReverseMap(); 
        }
    }
}
