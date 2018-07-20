using System.Linq;
using AutoMapper;
using SoznetApp.API.Dtos;
using SoznetApp.API.Models;

namespace SoznetApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt => {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt => {
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });
            
            CreateMap<User, UserForDetailDto>()
                .ForMember(dest => dest.PhotoUrl, opt => {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt => {
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });
            CreateMap<UserForUpdateDto, User>();
            CreateMap<UserForRegisterDto, User>();
            
            CreateMap<Photo, PhotosForDetailDto>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<MessageForCreationDto, Message>().ReverseMap();
            CreateMap<Message, MessageForReturnDto>()
                .ForMember(m => m.SenderPhotoUrl,
                    opt => opt.MapFrom(src => src.Sender.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(m => m.RecipientPhotoUrl,
                    opt => opt.MapFrom(src => src.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url));

                // configured automatically
                // .ForMember(dest => dest.SenderKnownAs, opt => { 
                //     opt.MapFrom(src => src.Sender.KnownAs);
                // })
                // .ForMember(dest => dest.RecipientKnownAs, opt => {
                //     opt.MapFrom(src => src.Recipient.KnownAs);
                // })
                // .
        }
    }
}