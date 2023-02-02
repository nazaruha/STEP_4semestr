using E_Learn.DataAccess.Data.Models.User;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore; // IdentityDbContext
using Microsoft.EntityFrameworkCore; // IConfigurationRoot
using Microsoft.Extensions.Configuration; // Configuration Builder
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// CONNECTION TO THE DB
namespace E_Learn.DataAccess.Data.Context
{
    public class AppDbContext : IdentityDbContext // inherit Identity framework
    {
        public DbSet<AppUser> AppUsers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionBuilder) // тут відбувається підключення до БД через ConnectionString який знаходить в appsettings.json
        {
            IConfigurationRoot configuration = new ConfigurationBuilder().
                SetBasePath(Directory.GetCurrentDirectory()). // веде нас в папку з проектом. Тобто в E_Learn.Web
                AddJsonFile("appsettings.json"). // вказуємо з яким файлом будемо працювати
                Build(); // створюємо цю конфігурацію
            var conntectionString = configuration.GetConnectionString("DefaultConnection"); // вказуємо де має бути цей Connection String (строка в якій у нас є підключення до БД)
            optionBuilder.UseSqlServer(conntectionString); // відбувається саме підключення до БД
        }
    }
}
