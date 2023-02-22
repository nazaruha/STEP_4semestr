using AutoMapper;
using E_Learn.DataAccess.Data.Context;
using E_Learn.DataAccess.Data.IRepository;
using E_Learn.DataAccess.Data.Models.Category;
using E_Learn.DataAccess.Data.Models.ViewModel.Category;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Learn.BusinessLogic.Services
{
    public class CategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoryService(ICategoryRepository categoryRepository)
        {
            this._categoryRepository= categoryRepository;
        }

        public async Task<ServiceResponse> GetCategoriesAsync()
        {
            List<Category> categories = await _categoryRepository.GetAll();
            return new ServiceResponse
            {
                Message = "All categories are loaded.",
                Success = true,
                Payload = categories
            };
        }
        public async Task<ServiceResponse> GetCategoryById(string id)
        {
            List<Category> categories = await _categoryRepository.GetAll();
            if (categories == null)
            {
                return new ServiceResponse
                {
                    Message = "Categories are not loaded",
                    Success = false
                };
            }
            var currentCategory = categories.Find(c => c.Id == id);
            if (currentCategory == null)
            {
                return new ServiceResponse
                {
                    Message = "Category is not found",
                    Success = false
                };
            }
            return new ServiceResponse
            {
                Message = "Category is found",
                Success = true,
                Payload = currentCategory
            };
        }
    }
}
