using AutoMapper;
using E_Learn.DataAccess.Data.Models.Category;
using E_Learn.DataAccess.Data.Models.ViewModel.Category;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Learn.DataAccess.AutoMapper.Category
{
    public class AutoMapperCategory : Profile
    {
        public AutoMapperCategory()
        {
            CreateMap<Data.Models.Category.Category, CategoryVM>().ReverseMap();
        }
    }
}
