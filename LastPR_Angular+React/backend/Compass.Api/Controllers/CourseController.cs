using Compass.Core.DTO_s;
using Compass.Core.Interfaces;
using Compass.Core.Services;
using Compass.Core.Validation.Course;
using Compass.Core.Validation.Token;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;

namespace Compass.Api.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;
        private readonly UserService _userService;

        public CourseController(ICourseService courseService, UserService userService)
        {
            _courseService = courseService;
            _userService = userService;
        }

        [HttpGet("courses")]
        public async Task<IActionResult> Index()
        {
            var result = await _courseService.GetAll();
            return Ok(result);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(CourseDto model)
        {
            var validation = new CourseValidation();
            var validationResult = await validation.ValidateAsync(model);

            if (validationResult.IsValid)
            {
                var result = await _courseService.CreateAsync(model);
                return Ok(result);
            }
            return BadRequest(validationResult.Errors);
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody]CourseDto model)
        {
            var validation = new CourseValidation();
            var validationResult = await validation.ValidateAsync(model);

            if (validationResult.IsValid)
            {
                var result = _courseService.UpdateAsync(model);
                return Ok(result);
            }
            return BadRequest(validationResult.Errors);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _courseService.DeleteAsync(id));    
        }

        [AllowAnonymous]
        [HttpPost("RefreshToken")]
        public async Task<IActionResult> RefreshToken([FromBody] TokenRequestDto model)
        {
            var validator = new TokenRequestValidation();
            var validatinResult = await validator.ValidateAsync(model);
            if (validatinResult.IsValid)
            {
                var result = await _userService.RefreshTokenAsync(model);
                if (result.Success)
                {
                    return Ok(result);
                }
                return BadRequest(result);
            }
            else
            {
                return BadRequest(validatinResult.Errors);
            }
        }
    }
}
