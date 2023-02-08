using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Learn.DataAccess.Data.Models.ViewModel.User
{
    public enum Role
    {
        Student,
        Teacher
    }
    public class SignUpUserVM
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string role { get; set; }
        public bool termsAndConditions { get; set; }

        public override string ToString()
        {
            return $"{Name} {Surname};\n{Email};\n{Password};\n{role};\nTerms:{termsAndConditions}";
        }

    }
}
