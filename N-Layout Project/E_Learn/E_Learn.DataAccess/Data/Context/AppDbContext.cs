using E_Learn.DataAccess.Data.Models.Categories;
using E_Learn.DataAccess.Data.Models.Course;
using E_Learn.DataAccess.Data.Models.User;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore; // IdentityDbContext
using Microsoft.EntityFrameworkCore; // IConfigurationRoot
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Configuration; // Configuration Builder
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

// CONNECTION TO THE DB
namespace E_Learn.DataAccess.Data.Context
{
    public class AppDbContext : IdentityDbContext // inherit Identity framework
    {
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Course> Courses { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionBuilder) // тут відбувається підключення до БД через ConnectionString який знаходить в appsettings.json
        {
            IConfigurationRoot configuration = new ConfigurationBuilder().
                SetBasePath(Directory.GetCurrentDirectory()). // веде нас в папку з проектом. Тобто в E_Learn.Web
                AddJsonFile("appsettings.json"). // вказуємо з яким файлом будемо працювати
                Build(); // створюємо цю конфігурацію
            var conntectionString = configuration.GetConnectionString("DefaultConnection"); // вказуємо де має бути цей Connection String (строка в якій у нас є підключення до БД)
            optionBuilder.UseSqlServer(conntectionString); // відбувається саме підключення до БД
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //makes Course's table field "Name" unique
            builder.Entity<Course>()
                .HasIndex(u => u.Title) // кластерний індекс
                .IsUnique();

            builder.Entity<Category>()
                .HasIndex(c => c.Name)
                .IsUnique();
        }
    }
}
