using Compass.Core.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Identity.Client;

namespace Compass.Api.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpPost("register")]
        //[AllowAnonymous]
        public async Task<IActionResult> InsertAsync([FromBody] RegisterUserDto model) // insert == create. FromBody - з тіла метода пост отримуємо данні
        {
            return Ok(); // status code 200. Means everything's ok;
        }
    }
}

//DTO - Data Transfer Object. Можуть перекидувати данні куда захочеш тіпа. А звичайні View лише методом пост шось типу того
