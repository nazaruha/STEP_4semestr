using E_Learn.DataAccess.Data.Models.ViewModel.User;
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
            RuleFor(r => r.Email).EmailAddress();
            RuleFor(r => r.Password).MinimumLength(6);
            RuleFor(r => r.ConfirmPassword).MinimumLength(6);
            RuleFor(r => r.ConfirmPassword).Equal(r => r.Password);
        }
    }
}
