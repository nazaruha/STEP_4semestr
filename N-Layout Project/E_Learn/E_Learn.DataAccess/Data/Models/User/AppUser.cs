using Microsoft.AspNetCore.Identity; // IdentityUser
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Learn.DataAccess.Data.Models.User
{
    public class AppUser : IdentityUser // inherits Identity's User
    {
        // Write fields that you want to add into your DB table
        public string Name { get; set; }
        public string Surname { get; set; }
    }
}
