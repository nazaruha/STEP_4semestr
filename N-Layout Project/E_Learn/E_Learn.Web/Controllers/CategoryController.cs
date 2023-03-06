using E_Learn.BusinessLogic.Services;
using E_Learn.DataAccess.Data.Models.Categories;
using Microsoft.AspNetCore.Mvc;

namespace E_Learn.Web.Controllers
{
    public class CategoryController : Controller
    {
        private readonly CategoryService _categoryService;
        public CategoryController(CategoryService categoryService) => _categoryService = categoryService;

        public async Task<IActionResult> Index()
        {
            var result = await _categoryService.GetCategoriesAsync();
            if (result.Success)
            {
                return View(result.Payload);
            }
            return View();
        }
        public IActionResult Create()
        {
            Category newCategory = new Category();
            return View(newCategory);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(string Name)
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
        public async Task<IActionResult> Edit(string id)
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
        public async Task<IActionResult> Edit(Category model)
        {
            var result = await _categoryService.EditCategoryAsync(model);
            if (result.Success)
            {
                return RedirectToAction(nameof(Index)); // the same as ("Index", "Categories"). Anyway, nameof type is more readily. Use it if the action of the controller in which you work
            }
            ViewBag.AuthError = result.Message;
            return View(model);
        }
        public async Task<IActionResult> Delete(string id)
        {
            var result = await _categoryService.DeleteCategoryAsync(id);
            if (result.Success)
            {
                return RedirectToAction(nameof(Index));
            }
            ViewBag.AuthError = result.Message;
            return RedirectToAction(nameof(Index));
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(Category model)
        {
            var result = await _categoryService.DeleteCategoryAsync(model.Id);
            if (result.Success)
            {
                return RedirectToAction(nameof(Index));
            }
            ViewBag.AuthError = result.Message;
            return RedirectToAction(nameof(Edit));
        }
    }
}
