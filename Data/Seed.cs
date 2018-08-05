using System.Collections.Generic;
using SoznetApp.Models;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Identity;

namespace SoznetApp.Data
{
    public class Seed
    {
        private readonly UserManager<User> _userManager;
        public Seed(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async void SeedUsers()
        {
                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);
                foreach (var user in users)
                {
                    await _userManager.CreateAsync(user, "password");
                }
        }
    }
}