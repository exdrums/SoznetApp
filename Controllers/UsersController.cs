using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using SoznetApp.Data;
using SoznetApp.Dtos;
using SoznetApp.Helpers;
using SoznetApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace SoznetApp.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;
        public UsersController(IDatingRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        [HttpGet]
        public async Task<IActionResult> GetUsers(UserParams userParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserId, true);

            userParams.UserId = currentUserId;

            if(string.IsNullOrEmpty(userParams.Gender))
            {
                userParams.Gender = userFromRepo.Gender == "male" ? "female" : "male";
            }

            var users = await _repo.GetUsers(userParams);

            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

            return Ok(usersToReturn);
        }

        [HttpGet("{id}", Name = "GetUser")] // GetUser is for register() in AuthController
        public async Task<IActionResult> GetUser(int id)
        {
            var isCurrentUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value) == id;
            var user = await _repo.GetUser(id, isCurrentUser);

            var userToReturn = _mapper.Map<UserForDetailDto>(user);

            return Ok(userToReturn);
        }

        // api/users/1 PUT:
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserForUpdateDto userForUpdateDto) 
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var userFromRepo = await _repo.GetUser(id, true);

            if (userFromRepo==null)
                return NotFound($"Could not find user with an ID of {id}");

            if (currentUserId != userFromRepo.Id)
                return Unauthorized();

            _mapper.Map(userForUpdateDto, userFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating user {id} failed on save");
        }

        [HttpGet("{id}/friends")]
        public async Task<IActionResult> GetFriends(int id)  
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var userContacts = await _repo.GetUserContacts(id);
            var users = userContacts.Select(uc => uc.Contact);

            return Ok(_mapper.Map<IEnumerable<UserForListDto>>(users));
        }

        [HttpPost("{id}/friends/{friendId}")]
        public async Task<IActionResult> AddFriend(int id, int friendId)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            if (await _repo.GetUserContact(id, friendId) != null)
                return BadRequest("You already add the user to your contact list");

            var userContact = new UserContact(){ UserId = id, ContactId = friendId };

            _repo.Add<UserContact>(userContact);

            if (await _repo.SaveAll())
                return Ok("The user was successfully added to your contact list.");
            return BadRequest("Failed to add to contact list");
        }

        [HttpDelete("{id}/friends/{friendId}")]
        public async Task<IActionResult> DeleteFriend(int id, int friendId)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            // var userContacts = await _repo.GetUserContacts(id);
            // var uc = userContacts.FirstOrDefault(c => c.ContactId == friendId);
            var uc = await _repo.GetUserContact(id, friendId);
            
            if (uc != null)
            {
                _repo.Delete<UserContact>(uc);
                return Ok("UserContact has been deleted");
            }
            return BadRequest();
        }

        [HttpGet("{id}/friends/requests")]
        public async Task<IActionResult> GetRequestsToFriends(int id)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var userContacts = await _repo.GetRequestedContacts(id);
            
            var users = userContacts.Select(uc => uc.User);
            return Ok(_mapper.Map<IEnumerable<UserForListDto>>(users));
        }

        [HttpPost("{id}/like/{recipientId}")]
        public async Task<IActionResult> LikeUser(int id , int recipientId) 
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var like = await _repo.GetLike(id, recipientId);
            if (like != null)
                return BadRequest("You already like the user");
            
            if (await _repo.GetUser(recipientId, false) == null)
                return NotFound();

            like = new Like
            {
                LikerId = id,
                LikeeId = recipientId
            };
            _repo.Add<Like>(like);

            if (await _repo.SaveAll())
                return Ok(new {}); // empty object for client
            return BadRequest("Failed to add like");
        }
    }
}