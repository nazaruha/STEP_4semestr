using E_Learn.DataAccess.Data.Context;
using E_Learn.DataAccess.Data.Models;
using E_Learn.DataAccess.Initializer;
using E_Learn.Web.Infrastructure.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args); // due to builder we can connect services, repositories etc.

// Add services
ServicesConfiguration.Config(builder.Services);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment()) // checks if it's developer or not
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

//app.UseAuthentication();
app.UseAuthorization();
app.UseEndpoints(endpoints => // this for Scafforld correct work
{
    endpoints.MapRazorPages();
    app.MapControllerRoute( // here is customised a work with Routing
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}"); // will be opened Home's Index.cshtml at the website strating
});

//app.MapControllerRoute( // here is customised a work with Routing
//    name: "default",
//    pattern: "{controller=Home}/{action=Index}/{id?}"); // will be opened Home's Index.cshtml at the website strating

await AppDbInitializer.Seed(app); // добавили наш сідер в проект. await - because Seed method is async Task

app.Run();
