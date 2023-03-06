using E_Learn.BusinessLogic.Services;
using E_Learn.DataAccess.Data.Models.Categories;
using E_Learn.DataAccess.Data.Models.Course;
using E_Learn.DataAccess.Data.ViewModel.Course;
using E_Learn.DataAccess.Validation.Course;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace E_Learn.Web.Controllers
{
    public class CourseController : Controller
    {
        private readonly CourseService _courseService;
        private readonly CategoryService _categoryService;
        public CourseController(CourseService courseService, CategoryService categoryService)
        {
            _courseService = courseService;
            _categoryService = categoryService;
        }
        public async Task<IActionResult> Index()
        {
            var result = await _courseService.GetCoursesAsync();
            if (result.Success)
            {
                return View(result.Payload);
            }
            ViewBag.AuthError = result.Message;
            return View(result.Payload);
        }
        public async Task<IActionResult> Create()
        {
            await LoadCategories(); // створює ViewBag з категоріями
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(AddCourseVM model)
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
                    return RedirectToAction(nameof(Index));
                ViewBag.AuthError = result.Message.First();
                await LoadCategories();
                return View(result.Payload);
            }
            ViewBag.AuthError = validationResult.Errors;
            await LoadCategories();
            return View();
        }
        private async Task LoadCategories()
        {
            var result = await _categoryService.GetCategoriesAsync();
            ViewBag.CategoryList = new SelectList( // CategoryList (можеш ввести любу назву яка тобі потрібна (сам придумуєш з голови))
                (System.Collections.IEnumerable)result.Payload,
                nameof(Category.Id),
                nameof(Category.Name)
                );
        }
        public async Task<IActionResult> Edit(string id)
        {
            var result = await _courseService.GetCourseByIdAsync(id);
            if (result.Success)
            {
                await LoadCategories();
                return View(result.Payload);
            }
            ViewBag.AuthError = result.Message;
            return RedirectToAction(nameof(Index));
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(EditCourseVM model)
        {
            var result = await _courseService.EditCourseAsync(model);
            if (result.Success)
            {
                return RedirectToAction(nameof(Index));
            }
            ViewBag.AuthError = result.Message;
            await LoadCategories();
            return View();
        }
        public async Task<IActionResult> Delete(string id)
        {
            var result = await _courseService.RemoveCourseAsync(id);
            if (result.Success)
            {
                return RedirectToAction(nameof(Index));
            }
            ViewBag.AuthError = result.Message;
            return RedirectToAction(nameof(Index));
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(EditCourseVM model)
        {
            var result = await _courseService.RemoveCourseAsync(model.Id);
            if (result.Success)
            {
                return RedirectToAction(nameof(Index));
            }
            ViewBag.AuthError = result.Message;
            return RedirectToAction(nameof(Edit));
        }
    }
}
