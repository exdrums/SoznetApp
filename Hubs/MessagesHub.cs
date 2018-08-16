using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using SoznetApp.Models;

namespace SoznetApp.Hubs
{
    public class MessagesHub : Hub
    {
        public Task SendMessage(Message message)
        {
            return Clients.All.SendAsync("Send", message);
        }
    }
}