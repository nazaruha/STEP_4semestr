using E_Learn.DataAccess.Validation.User;
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
using E_Learn.DataAccess.Data.Models.Categories;
using System.ComponentModel;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Identity.Client;
using ELearn.DataAccess.Migrations;
using E_Learn.DataAccess.Data.ViewModel.User;
using E_Learn.DataAccess.Data.ViewModel.Course;
using E_Learn.DataAccess.Validation.Course;

namespace E_Learn.Web.Controllers
{
    [Authorize] // авторизований. Захищений контролер стає. До нього не можемо доступитись
    public class AdminController : Controller
    {
        private readonly UserService _userService;
        private readonly CategoryService _categoryService;
        private readonly CourseService _courseService;

        public AdminController(UserService userService, CategoryService categoryService, CourseService courseService)
        {
            _userService = userService;
            _categoryService = categoryService;
            _courseService = courseService;
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
        [ValidateAntiForgeryToken]
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
        public async Task<IActionResult> Courses()
        {
            var result = await _courseService.GetCoursesAsync();
            if (result.Success)
            {
                return View(result.Payload);
            }
            ViewBag.AuthError = result.Message;
            return View(result.Payload);
        }
        public async Task<IActionResult> AddCourse()
        {
            await LoadCategories(); // створює ViewBag з категоріями
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddCourse(AddCourseVM model)
        {
            var validator = new AddCourseValidation();
            var validationResult = await validator.ValidateAsync(model);
            if (validationResult.IsValid)
            {
                if (model.Files != null) // означає що ми якийсь файл добавили (фотку)
                {
                    model.Files = HttpContext.Request.Form.Files; // отримуємо файли які наш юзер щено передав
                }
                var result = await _courseService.AddCourseAsync(model);
                if (result.Success)
                    return RedirectToAction(nameof(Courses));
                ViewBag.AuthError = result.Message.First();
                await LoadCategories();
                return View(result.Payload);
            }
            ViewBag.AuthError = validationResult.Errors;
            await LoadCategories();
            return View();
        }
        public async Task<IActionResult> EditCourse(string id)
        {
            var result = await _courseService.GetCourseByIdAsync(id);
            if (result.Success)
            {
                await LoadCategories();
                return View(result.Payload);
            }
            ViewBag.AuthError = result.Message;
            return RedirectToAction(nameof(Courses));
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditCourse(EditCourseVM model)
        {
            var result = await _courseService.EditCourseAsync(model);
            if (result.Success)
            {
                return RedirectToAction(nameof(Courses));
            }
            ViewBag.AuthError = result.Message;
            await LoadCategories();
            return View();

        }
        public async Task<IActionResult> DeleteCourse(string id)
        {
            var result = await _courseService.RemoveCourseAsync(id);
            if (result.Success)
            {
                return RedirectToAction(nameof(Courses));
            }
            ViewBag.AuthError = result.Message;
            return RedirectToAction(nameof(Courses));
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteCourse(EditCourseVM model)
        {
            var result = await _courseService.RemoveCourseAsync(model.Id);
            if (result.Success)
            {
                return RedirectToAction(nameof(Courses));
            }
            ViewBag.AuthError = result.Message;
            return RedirectToAction(nameof(EditCourse));
        }
        private async System.Threading.Tasks.Task LoadCategories()
        {
            var result = await _categoryService.GetCategoriesAsync();
            ViewBag.CategoryList = new SelectList( // CategoryList (можеш ввести любу назву яка тобі потрібна (сам придумуєш з голови))
                (System.Collections.IEnumerable)result.Payload,
                nameof(Category.Id),
                nameof(Category.Name)
                );
        }
        public async Task<IActionResult> Categories()
        {
            var result = await _categoryService.GetCategoriesAsync();
            if (result.Success)
            {
                return View(result.Payload);
            }
            return View();
        }
        public async Task<IActionResult> EditCategory(string id)
        {
            var result = await _categoryService.GetCategoryByIdAsync(id);
            if (result.Success)
            {
                return View(result.Payload);
            }
            ViewBag.AuthError = result.Message;
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditCategoryAsync(Category model)
        {
            var result = await _categoryService.EditCategoryAsync(model);
            if (result.Success)
            {
                return RedirectToAction(nameof(Categories)); // the same as ("Categories", "Admin"). Anyway, nameof type is more readily. Use it if the action of the controller in which you work
            }
            ViewBag.AuthError = result.Message;
            return View(model);
        }
        public async Task<IActionResult> DeleteCategory(string id)
        {
            var result = await _categoryService.DeleteCategoryAsync(id);
            if (result.Success)
            {
                return RedirectToAction("Categories", "Admin");
            }
            ViewBag.AuthError = result.Message;
            return RedirectToAction(nameof(Categories));
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteCategory(Category model)
        {
            var result = await _categoryService.DeleteCategoryAsync(model.Id);
            if (result.Success)
            {
                return RedirectToAction("Categories", "Admin");
            }
            ViewBag.AuthError = result.Message;
            return RedirectToAction(nameof(EditCategory));
        }
        public IActionResult AddCategory()
        {
            Category newCategory = new Category();
            return View(newCategory);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddCategory(string Name)
        {
            var result = await _categoryService.AddCategoryAsync(Name);
            if (result.Success)
            {
                ViewBag.AuthError = result.Message;
                return View();
            }
            ViewBag.AuthError = result.Message;
            return View();
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
        [HttpPost]
        [ValidateAntiForgeryToken] // щоб не могли фейкові данні прислати
        public async Task<IActionResult> ListUserSettings(UpdateProfileVM model)
        {
            var validation = new ListUserValidation();
            var validationResult = await validation.ValidateAsync(model);
            if (validationResult.IsValid)
            {
                var result = await _userService.UpdateListUserAsync(model);
                if (result.Success)
                {
                    return RedirectToAction("Users", "Admin");
                }
                ViewBag.AuthError = result.Message;
                return View(model);
            }
            return View(model);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteUser(UpdateProfileVM model)
        {
            var result = await _userService.DeleteUserAsync(model.Id);
            if (result.Success)
            {
                return RedirectToAction(nameof(Users));
            }
            ViewBag.AuthError = result.Message;
            return RedirectToAction(nameof(ListUserSettings));
            
        }
        public async Task<IActionResult> DeleteUser(string id)
        {
            var result = await _userService.DeleteUserAsync(id);
            if (result.Success)
            {
                return RedirectToAction(nameof(Users));
            }
            ViewBag.AuthError = result.Message;
            return RedirectToAction(nameof(Users));
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> BlockUser(UpdateProfileVM model)
        {
            var result = await _userService.BlockUserAsync(model);
            // не передати звідси в іншу View помилки свої. Як це зробити?
            return RedirectToAction(nameof(ListUserSettings), model);
            
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> UnblockUser(UpdateProfileVM model)
        {
            var result = await _userService.UnblockUserAsync(model);
            return RedirectToAction(nameof(ListUserSettings), model);

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
        [AllowAnonymous]
        public IActionResult ForgotPassword()
        {
            return View();
        }
        [AllowAnonymous]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ForgotPassword([FromForm] string email) // уточнили що з форми отримуємо данні
        {
            var result = await _userService.ForgotPasswordAsync(email);
            if (result.Success)
            {
                ViewBag.AuthError = result.Message;
            }
            else
            {
                ViewBag.AuthError = result.Message;
            }
            return View();
        }
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ResetPassword(string email, string token)
        {
            ViewBag.Token = token;
            ViewBag.Email = email;
            return View();
        }
        [AllowAnonymous]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ResetPassword([FromForm] ResetPasswordVM model)
        {
            var validator = new ResetPasswordValidation();
            var validatorResult = await validator.ValidateAsync(model);
            if (validatorResult.IsValid)
            {
                var result = await _userService.ResetPasswordAsync(model);
                if (result.Success)
                {
                    return RedirectToAction("SignIn", "Admin");
                }
                ViewBag.AuthError = result.Errors;
                return View(model);
            }
            ViewBag.AuthError = validatorResult.Errors;
            return View(model);
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
