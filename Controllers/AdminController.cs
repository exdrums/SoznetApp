using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using SoznetApp.Data;
using Microsoft.EntityFrameworkCore;
using SoznetApp.Dtos;
using Microsoft.AspNetCore.Identity;
using SoznetApp.Models;

namespace SoznetApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly DataContext context;
        private readonly UserManager<User> userManager;

        public AdminController(DataContext context, UserManager<User> userManager)
        {
            this.userManager = userManager;
            this.context = context;
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("usersWithRoles")]
        public async Task<IActionResult> GetUsersWithRoles()
        {
            var userList = await
                (
                    from user in context.Users
                    orderby user.UserName
                    select new
                    {
                        Id = user.Id,
                        UserName = user.UserName,
                        Roles =
                            (
                                from userRole in user.UserRoles
                                join role in context.Roles
                                on userRole.RoleId
                                equals role.Id
                                select role.Name
                            ).ToList()
                    }
                ).ToListAsync();
            return Ok(userList);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("editRoles/{userName}")]
        public async Task<IActionResult> EditRoles(string userName, RoleEditDto roleEditDto)
        {
            var user = await userManager.FindByNameAsync(userName);
            var userRoles = await userManager.GetRolesAsync(user);
            var selectedRoles = roleEditDto.RoleNames;
            // selectedRoles = selectedRoles != null ? selectedRoles : new string[]{};
            selectedRoles = selectedRoles ?? new string[]{};

            var result = await userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));
            if(!result.Succeeded)
                return BadRequest("Failed to add to roles");
            
            result = await userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));
            if(!result.Succeeded)
                BadRequest("Failed to remove the roles");

            return Ok(await userManager.GetRolesAsync(user));
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpGet("photosForModeration")]
        public IActionResult GetPhotosForModeration()
        {
            return Ok("Admins or moderators can see this");
        }
    }
}