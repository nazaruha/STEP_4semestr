using AutoMapper;
using E_Learn.DataAccess.Data.Models.User;
using E_Learn.DataAccess.Data.Models.ViewModel.User;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Learn.DataAccess.AutoMapper.User
{
    public class AutoMapperUserProfile : Profile // this Profile we get from AutoMapper. Due to this we can convert models (reproduce it in the ctor)
    {
        public AutoMapperUserProfile()
        {
            // двостороння конвертація - туда і сюда можем конвертувати AppUser -> SignInUserVM and SignInUserVM -> AppUser
            CreateMap<AppUser /*what we want to convert*/, SignInUserVM /*in what we want to convert*/>();
            CreateMap<SignInUserVM, AppUser>();
            CreateMap<SignUpUserVM, AppUser>().ReverseMap();
            CreateMap<UserProfileVM, AppUser>().ReverseMap();
            CreateMap<ListUserVM, AppUser>().ReverseMap();
            CreateMap<UpdateProfileVM, AppUser>().ReverseMap();
        }

    }
}
