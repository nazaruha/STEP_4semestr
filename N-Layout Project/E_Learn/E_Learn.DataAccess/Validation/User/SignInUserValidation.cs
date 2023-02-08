using E_Learn.DataAccess.Data.Models.ViewModel.User;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Learn.DataAccess.Validation.User
{
    // this class is responsible for user's sign in validation
    public class SignInUserValidation : AbstractValidator<SignInUserVM> // inherit fluent validator. In triangle brackets input a model with we're going to work
    {
        public SignInUserValidation()
        {
            // we need to make additional validation. Because we can change the type of our inputs in HTML. So this's like insurance
            RuleFor(r => r.Email).NotEmpty().EmailAddress(); // this is our rules for Email: Not empty, correct email address
            RuleFor(r => r.Password).NotEmpty().MinimumLength(6); // rule for Password: Not empty, min length == 6
        }
    }
}
