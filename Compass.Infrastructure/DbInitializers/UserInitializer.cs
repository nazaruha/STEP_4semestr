using Compass.Core.Entities;
using Compass.Infrastructure.Context;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Infrastructure.DbInitializers
{
    public class UserInitializer
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
                    AppUser user = new AppUser()
                    {
                        UserName = "user@email.com",
                        Email = "user@email.com",
                        EmailConfirmed = true,
                        Name = "User",
                        Surname = "User",
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
                            Name = "Users",
                            NormalizedName = "USERS"
                        }
                        );

                    await _context.SaveChangesAsync(); // зберігаємо зміни (створили ролі)

                    IdentityResult resultAdmin = userManager.CreateAsync(admin, "Qwerty-1"/*пароль юзера*/).Result; // створили адміна
                    IdentityResult resultUser = userManager.CreateAsync(user, "Qwerty-1").Result; // створили вчителя

                    // перевіряє чи все збс створилось і добавляє в ролі    
                    if (resultAdmin.Succeeded)
                    {
                        userManager.AddToRoleAsync(admin, "Administrators").Wait();
                    }
                    if (resultUser.Succeeded)
                    {
                        userManager.AddToRoleAsync(user, "Users").Wait();
                    }
                }
            }

            // ЗАКОМЕНТУВАВ, БО ЯКЩО УДАЛЮ ЯКУСЬ З КАТЕГОРІЙ ТО БУДЕ БАГАТО КОПІЙ
            //using (var context = new AppDbContext()) // добaвляєм наші категорії
            //{
            //    if (await context.Categories.FirstOrDefaultAsync(c => c.Name == "Programming") == null) // doesn't work
            //    {
            //        context.Categories.AddRange(
            //            new Category()
            //            {
            //                Id = Guid.NewGuid().ToString(),
            //                Name = "Programming"
            //            },
            //            new Category()
            //            {
            //                Id = Guid.NewGuid().ToString(),
            //                Name = "Design"
            //            },
            //            new Category()
            //            {
            //                Id = Guid.NewGuid().ToString(),
            //                Name = "DevOps"
            //            }
            //            );

            //        await context.SaveChangesAsync();
            //    }
            //}
        }
    }
}
