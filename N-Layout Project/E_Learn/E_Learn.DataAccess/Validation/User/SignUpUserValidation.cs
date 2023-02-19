using E_Learn.DataAccess.Data.Models.ViewModel.User;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Learn.DataAccess.Validation.User
{
    public class SignUpUserValidation : AbstractValidator<SignUpUserVM>
    {
        public SignUpUserValidation()
        {
            RuleFor(r => r.Name).NotEmpty();
            RuleFor(r => r.Surname).NotEmpty();
            RuleFor(r => r.Email).NotEmpty().EmailAddress();
            RuleFor(r => r.Password).NotEmpty().MinimumLength(6);
            RuleFor(r => r.ConfirmPassword).NotEmpty().MinimumLength(6).Equal(r => r.Password); // ConfirmPassword must be equal to the Password property
            RuleFor(r => r.Role).NotEmpty();
        }
    }
}
