using Microsoft.AspNetCore.Mvc;

namespace E_Learn.Web.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult SignUp()
        {
            return View();
        }
        public IActionResult SignIn()
        {
            return View();
        }
        public IActionResult Tables()
        {
            return View();
        }

        public IActionResult Profile()
        {
            return View();
        }
    }
}
