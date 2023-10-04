using Compass.Core.DTO_s;
using Compass.Core.Interfaces;
using Compass.Core.Validation.Category;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace Compass.Api.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet("categories")]
        public async Task<IActionResult> Index()
        {
            return Ok(await _categoryService.GetAll()); 
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(CategoryDto model)
        {
            var validator = new CategoryValidation();
            var validationResult = await validator.ValidateAsync(model);
            if (validationResult.IsValid)
            {
                var result = await _categoryService.CreateAsync(model);
                return Ok(result);
            }
            return BadRequest(validationResult.Errors.FirstOrDefault());
        }
        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody]CategoryDto model)
        {
            var validator = new CategoryValidation();
            var validationResult = await validator.ValidateAsync(model);
            if (validationResult.IsValid)
            {
                var result = await _categoryService.UpdateAsync(model);
                return Ok(result);
            }
            return BadRequest(validationResult.Errors);
        }
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _categoryService.DeleteAsync(id);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [HttpGet("get-by-id/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _categoryService.GetByIdAsync(id);
            if (result.Success)
                return Ok(result);
            return BadRequest(result);
        }
    }
}

/*
{
  "email": "admin@email.com",
  "password": "Qwerty-1",
  "rememberMe": true
} 
 */
