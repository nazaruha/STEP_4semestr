using E_Learn.DataAccess.Data.Context;
using E_Learn.DataAccess.Data.Models.User;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Learn.DataAccess.Initializer
{
    public class AppDbInitializer
    {
        public static/* static - означає шо ми можемо викликати цю функцію без екземпляра класса*/ async Task/*async Task - асинхронний поток, який не буде конфліктувати з іншими потоками. Будуть пропускати одне одного*/ Seed/*Seed - Data seeding is the process of populating a database with an initial set of data.*/(IApplicationBuilder applicationBuilder)
        {
            using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope()/*доступається до UserManager - той хто керує користувачами*/) // коли ти вийдеш з цього using'a - воно очистить ОП з тих данних які ми тут в цьому using юзали
            {
                var _context = serviceScope.ServiceProvider.GetService<AppDbContext>(); // доступається до context'a (DB)
                // UserManager - це клас який ми достаємо з Identity
                UserManager<AppUser> userManager = serviceScope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();

                if (userManager.FindByEmailAsync("admin@email.com").Result == null) // перевіряє чи є у нас юзер з емейлом admin@email.com
                {
                    // Створюємо наших юзерів
                    AppUser admin = new AppUser()
                    {
                        UserName = "admin@email.com",
                        Email = "admin@email.com",
                        EmailConfirmed = true,
                        Name = "Admin",
                        Surname = "Admin",
                        PhoneNumber = "+xx(xxx)xx-xx-xxx",
                        PhoneNumberConfirmed = true,
                    };
                    AppUser teacher = new AppUser()
                    {
                        UserName = "teacher@email.com",
                        Email = "teacher@email.com",
                        EmailConfirmed = true,
                        Name = "Teacher",
                        Surname = "Teacher",
                        PhoneNumber = "+xx(xxx)xx-xx-xxx",
                        PhoneNumberConfirmed = true,
                    };
                    AppUser student = new AppUser()
                    {
                        UserName = "student@email.com",
                        Email = "student@email.com",
                        EmailConfirmed = true,
                        Name = "Student",
                        Surname = "Student",
                        PhoneNumber = "+xx(xxx)xx-xx-xxx",
                        PhoneNumberConfirmed = true,
                    };
                    
                    //створюємо ролі
                    _context.Roles.AddRange(
                        new IdentityRole()
                        {
                            Name = "Administrators",
                            NormalizedName = "ADMINISTRATORS"
                        },
                        new IdentityRole() 
                        {
                            Name = "Teachers",
                            NormalizedName = "TEACHERS"
                        },
                        new IdentityRole()
                        {
                            Name = "Students",
                            NormalizedName = "STUDENTS"
                        }
                        );

                    await _context.SaveChangesAsync(); // зберігаємо зміни (створили ролі)

                    IdentityResult resultAdmin = userManager.CreateAsync(admin, "Qwerty-1"/*пароль юзера*/).Result; // створили адміна
                    IdentityResult resultTeacher = userManager.CreateAsync(teacher, "Qwerty-1").Result; // створили вчителя
                    IdentityResult resultStudent = userManager.CreateAsync(student, "Qwerty-1").Result; // створили студентац

                    // перевіряє чи все збс створилось і добавляє в ролі    
                    if (resultAdmin.Succeeded)
                    {
                        userManager.AddToRoleAsync(admin, "Administrators").Wait();
                    }
                    if (resultTeacher.Succeeded)
                    {
                        userManager.AddToRoleAsync(teacher, "Teachers").Wait();
                    }
                    if (resultStudent.Succeeded)
                    {
                        userManager.AddToRoleAsync(student, "Students").Wait();
                    }
                }
            }
        }
    }
}
