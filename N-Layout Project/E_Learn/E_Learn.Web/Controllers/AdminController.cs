using E_Learn.DataAccess.Data.Models.ViewModel.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace E_Learn.Web.Controllers
{
    [Authorize] // авторизований. Захищений контролер стає. До нього не можемо доступитись
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [AllowAnonymous] // дозволяє переходити сюда навіть незареєстрованим
        public IActionResult SignUp()
        {
            return View();
        }
        [AllowAnonymous]
        [HttpGet] // він стоїть по замовчуванню, але тут для уточнення. 
        public IActionResult SignIn()
        {
            return View();
        }
        [AllowAnonymous] // дозволяє переходити сюда навіть незареєстрованим
        [HttpPost] // HttpSet - приймає данні
        public IActionResult SignIn(SignInUserVM user)
        {
            return View();
        }
        public IActionResult Users()
        {
            return View();
        }
        public IActionResult Profile()
        {
            return View();
        }
    }
}
