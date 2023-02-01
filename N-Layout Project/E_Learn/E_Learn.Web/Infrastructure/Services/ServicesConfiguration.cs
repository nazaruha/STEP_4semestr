using E_Learn.DataAccess.Data.Context;
using E_Learn.DataAccess.Data.Models;
using Microsoft.AspNetCore.Identity;

namespace E_Learn.Web.Infrastructure.Services
{
    public class ServicesConfiguration
    {
        public static void Config(IServiceCollection services)
        {
            // Add services to the container.
            services.AddControllersWithViews();

            // Add database context
            services.AddDbContext<AppDbContext>();

            // Add Razor pages
            services.AddRazorPages();

            // Add identity COMMENT IT IF YOU WANT TO ADD SCAFFOLDING ITEMS
            services.AddIdentity<AppUser, IdentityRole>(options =>
            {
                // ТУТ МИ ВСТАНОВЛЮЄМО ПРАВИЛА ЛОГІНА
                options.SignIn.RequireConfirmedEmail = true; // пошта має бути обов'язково підтверджена
                options.User.RequireUniqueEmail = true; // пошта має бути унікальна якщо true (не повторюватись)
                options.Lockout.MaxFailedAccessAttempts = 5; // Блокається акк, якщо 5 раз неправильних логінів
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5); // блокує обліковий запис на 5хв, якщо 5 неправильних спроб було (те шо вище зробили)

                // password's rules 
                options.Password.RequireDigit = true; // входять цифри (як мінімум 1)
                options.Password.RequireLowercase = true; // входять букви нижнього регістра (як мінімум 1)
                options.Password.RequireUppercase = true; // входять букви верхнього регістра (як мінімум 1)
                options.Password.RequireNonAlphanumeric = true; // якийсь небуквенний символ (як мінімум 1)
                options.Password.RequiredLength = 6; // довжина пароля мінімум 6
            })
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();
        }
    }
}
