using Compass.Core.DTO_s;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Core.Validation.Course
{
    public class CourseValidation : AbstractValidator<CourseDto>
    {
        public CourseValidation() 
        { 
            RuleFor(c => c.Title).NotEmpty();
            RuleFor(c => c.Description).NotEmpty();
            RuleFor(c => c.Price).NotEmpty();
        }
    }
}
