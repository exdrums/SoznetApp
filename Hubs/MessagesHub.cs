using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using SoznetApp.Models;

namespace SoznetApp.Hubs
{  
    public class MessagesHub : Hub
    {
        public async Task SendMessage(Message message, string userId)
        {
            await Clients.Group(userId).SendAsync("PrivateMessage", message);
        }
        public override async Task OnConnectedAsync()
        {
            await Clients.All.SendAsync("ReceiveSystemMessage", $"{Context.UserIdentifier} joined.");
            await base.OnConnectedAsync();
        }
        public async Task AddToGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            await Clients.Group(groupName).SendAsync("ReceiveSystemMessage", $"{Context.ConnectionId} has joined the group {groupName}.");
        }
    }
}