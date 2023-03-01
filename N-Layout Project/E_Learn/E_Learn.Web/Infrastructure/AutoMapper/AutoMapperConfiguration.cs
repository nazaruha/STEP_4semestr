using E_Learn.DataAccess.AutoMapper.Courses;
using E_Learn.DataAccess.AutoMapper.User;
using E_Learn.DataAccess.Validation.Course;

namespace E_Learn.Web.Infrastructure.AutoMapper
{
    public class AutoMapperConfiguration
    {
        public static void Config(IServiceCollection services)
        {
            //Users mapping
            services.AddAutoMapper(typeof(AutoMapperUserProfile));

            //Courses mapping
            services.AddAutoMapper(typeof(AutoMapperCourseProfile));
        }
    }
}
