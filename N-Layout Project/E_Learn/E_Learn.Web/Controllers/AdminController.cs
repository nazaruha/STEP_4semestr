using E_Learn.DataAccess.Validation.User;
using E_Learn.DataAccess.Data.Models.ViewModel.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using E_Learn.BusinessLogic.Services;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System.Net.WebSockets;
using E_Learn.DataAccess.Data.Models.User;
using AutoMapper;
using NuGet.DependencyResolver;
using Microsoft.Exchange.WebServices.Data;

namespace E_Learn.Web.Controllers
{
    [Authorize] // авторизований. Захищений контролер стає. До нього не можемо доступитись
    public class AdminController : Controller
    {
        private readonly UserService _userService;
        private readonly IMapper _mapper;

        public AdminController(UserService userService)
        {
            _userService = userService;
        }
        public IActionResult Index()
        {
            return View();
        }
        public async Task<IActionResult> Logout()
        {
            var result = await _userService.LogoutUserAsync();
            if (result.Success) // if user logged out
            {
                return RedirectToAction("Index", "Home");   
            }
            return RedirectToAction("Index", "Admin");
        }
        [AllowAnonymous] // дозволяє переходити сюда навіть незареєстрованим
        [HttpGet] // тобто просто відображає сторінку
        public IActionResult SignUp()
        {
            var user = HttpContext.User.Identity.IsAuthenticated; // returns true if user is authenticated
            if (user == true) // if user is already authenticated we return him to the home page
            {
                return RedirectToAction("Index", "Home");
            }
            return View();
        }
        [AllowAnonymous]
        [HttpPost] // а тут приумає данні які користувач надсилає на цю сторінку методом post
        public async Task<IActionResult> SignUp(SignUpUserVM model)
        {
            var validator = new SignUpUserValidation();
            var validationResult = await validator.ValidateAsync(model);
            if (validationResult.IsValid)
            {
                var result = await _userService.SignUpUserAsync(model);
                if (!result.Success)
                {
                    ViewBag.AuthError = result.Message;
                    return View(model);
                }
                return RedirectToAction("SignIn", "Admin");
            }
            ViewBag.AuthError = validationResult.Errors.First();
            return View(model);
        }
        [AllowAnonymous]
        [HttpGet] // він стоїть по замовчуванню, але тут для уточнення. 
        public IActionResult SignIn()
        {
            var user = HttpContext.User.Identity.IsAuthenticated; // returns true if user is authenticated
            if (user == true) // if user is already authenticated we return him to the home page
            {
                return RedirectToAction("Index", "Home");
            }
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
                var result = await _userService.SignInUserAsync(model);
                if (result.Success) // означає шо ми реально залогінились
                {
                    //return View();
                    return RedirectToAction("Index", "Admin"); // буде нас перекидувати в Index view контролера Admin
                }
                //return RedirectToAction("Index"); // тут у нас крч відкривається доступ до Index сторінки контролера Admin для авторизованого юзера
                ViewBag.AuthError = result.Message;//Юзаєм його вже в нашій view. він там автоматично прогружений. така зміна, яку ініціалізуємо тут, а прогружаєм в нашій view
                return View(model);
            }
            return View(model);
            
        }
        public async Task<IActionResult> Users()
        {
            var result = await _userService.GetUserListAsync();
            if (result.Success)
            {
                return View(result.Payload);
            }
            return View();
        }
        public async Task<IActionResult> ListUserSettings(string id)
        {
            var result = await _userService.FindUserByIdAsync(id);
            if (result.Success)
            {
                return View(result.Payload);
            }
            return View();
        }
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmEmail(string userId, string token)
        {
            var result = await _userService.ConfirmEmailAsync(userId, token);
            if (result.Success)
            {
                return RedirectToAction("ConfirmEmail", "Admin");
            }
            return View();
        }
        public async Task<IActionResult> Profile()
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier); // получаєм юзера який прям зараз залогінений
            var controllerName = this.ControllerContext.RouteData.Values["controller"].ToString();
            Console.WriteLine(controllerName);
            var user = await _userService.GetUserProfileAsync(userId);
            if (user.Success)
            {
                return View(user.Payload);
            }
            return View();
        }
        public async Task<IActionResult> UserSettings()
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var result = await _userService.GetUserUpdateAsync(userId);
            if (result.Success)
            {
                return View(result.Payload);
            }
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> UserSettings(UpdateProfileVM model)
        {
            var validator = new UpdateUserProfileValidation();
            var validationResult = await validator.ValidateAsync(model);
            if (validationResult.IsValid)
            {
                var result = await _userService.UpdateUserProfileAsync(model);
                if (result.Success)
                {
                    // треба відправити на пошту конфірм і логаутнути юзера і перекинути на сайн ін
                    return RedirectToAction("SignIn", "Admin");
                }
                ViewBag.AuthError = result.Message;
                return View(model);
            }
            return View(model);
        }
    }
}
