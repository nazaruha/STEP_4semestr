using E_Learn.DataAccess.Validation.User;
using E_Learn.DataAccess.Data.Models.ViewModel.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace E_Learn.Web.Controllers
{
    [Authorize] // авторизований. Захищений контролер стає. До нього не можемо доступитись
    public class AdminController : Controller
    {
        //private readonly UserService _userService;

        //public AdminController(UserService userService)
        //{
        //    _userService = userService;
        //}
        public IActionResult Index()
        {
            return View();
        }
        [AllowAnonymous] // дозволяє переходити сюда навіть незареєстрованим
        [HttpGet]
        public IActionResult SignUp()
        {
            return View();
        }
        [AllowAnonymous]
        [HttpPost]
        public IActionResult SignUp(SignUpUserVM user)
        {
            Console.WriteLine(user);
            return View();
        }
        [AllowAnonymous]
        [HttpGet] // він стоїть по замовчуванню, але тут для уточнення. 
        public IActionResult SignIn()
        {
            return View();
        }
        [AllowAnonymous] // дозволяє переходити сюда навіть незареєстрованим
        [HttpPost] // HttpSet - приймає данні користувача
        public async Task<IActionResult> SignIn(SignInUserVM model)
        {
            //треба перевірити вміст, чи все є що нам треба (FluentValidation)
            var validator = new SignInUserValidation(); // connect our validator
            var validationResult = await validator.ValidateAsync(model);
            if (validationResult.IsValid) // if everything is correct in validation
            {
                //var result = await _userService.LoginUserAsync(model);
                //if (result != null)
                //{
                //    return View();
                //}
                //return RedirectToAction("Index");
                return View();
            }
            return View(model);
            
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
