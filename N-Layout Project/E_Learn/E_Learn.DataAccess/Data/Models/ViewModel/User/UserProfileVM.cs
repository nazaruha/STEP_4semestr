using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Learn.DataAccess.Data.Models.ViewModel.User
{
    public class UserProfileVM
    {
        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string EmailConfirmed { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public bool isLocked  { get; set; }
        public string Role { get; set; } = string.Empty;


    }
}
