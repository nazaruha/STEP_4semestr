using E_Learn.DataAccess.Data.ViewModel.Course;
using FluentValidation;
using FluentValidation.AspNetCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Learn.DataAccess.Validation.Course
{
    public class AddCourseValidation : AbstractValidator<AddCourseVM>
    {
        public AddCourseValidation()
        {
            RuleFor(r => r.Title).NotEmpty();
            RuleFor(r => r.Description).NotEmpty();
            RuleFor(r => r.Price).NotEmpty().GreaterThanOrEqualTo(0).LessThanOrEqualTo(100000); // ціна буде [0 ; 100000
            RuleFor(r => r.CategoryId).NotEqual("-- Select Category --");
        }
    }
}
