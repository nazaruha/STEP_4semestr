using E_Learn.DataAccess.Data.ViewModel.User;
using FluentValidation;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Learn.DataAccess.Validation.User
{
    public class UpdateUserProfileValidation : AbstractValidator<UpdateProfileVM>
    {
        public UpdateUserProfileValidation() 
        {
            RuleFor(r => r.Name).NotEmpty();
            RuleFor(r => r.Surname).NotEmpty();
            RuleFor(r => r.Email).NotEmpty().EmailAddress();
            RuleFor(r => r.Password).NotEmpty().MinimumLength(6);
            RuleFor(r => r.ConfirmPassword).NotEmpty().MinimumLength(6);
            RuleFor(r => r.ConfirmPassword).Equal(r => r.Password);
        }
    }
}
