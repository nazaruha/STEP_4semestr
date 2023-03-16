using Compass.Core.Entities;
using Compass.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Infrastructure
{
    public static class ServiceExtentions
    {

        public static void AddDbContext(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<AppDbContext>(opt => opt.UseSqlServer(connectionString));
        }

        //public static void AddIdentity(this IServiceCollection services)
        //{
        //    services.AddIdentity<AppUser, IdentityRole>()
        //        .AddDefaultTokenProviders()
        //        .AddEntityFrameworkStores<AppDbContext>();
        //}
        //public static void AddDbContext(this IServiceCollection services, string connectionString)
        //{
        //    services.AddDbContext<AppDbContext>(opt => opt.UseSqlServer(connectionString));
        //}

        //public static void AddInfrastructureServices(this IServiceCollection services)
        //{
        //    // Add Identity
        //    services.AddIdentity<AppUser, IdentityRole>(options =>
        //    {
        //        options.SignIn.RequireConfirmedEmail = true;
        //        options.Lockout.MaxFailedAccessAttempts = 5;
        //        options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
        //        options.Password.RequireDigit = true;
        //        options.Password.RequireUppercase = true;
        //        options.Password.RequireLowercase = true;
        //        options.Password.RequiredLength = 6;
        //        options.Password.RequireNonAlphanumeric = true;
        //        options.User.RequireUniqueEmail = true;
        //    })
        //                .AddEntityFrameworkStores<AppDbContext>()
        //                .AddDefaultTokenProviders();
        //}
    }
}
