﻿using AutoMapper;
using Azure.Core;
using E_Learn.DataAccess.Data.Context;
using E_Learn.DataAccess.Data.IRepository;
using E_Learn.DataAccess.Data.Models.Categories;
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
        private readonly ICourseRepository _courseRepository;
        public CategoryService(ICategoryRepository categoryRepository, ICourseRepository courseRepository)
        {
            _categoryRepository = categoryRepository;
            _courseRepository = courseRepository;   
        }

        public async Task<ServiceResponse> GetCategoriesAsync()
        {
            List<Category> categories = await _categoryRepository.GetAllAsync();
            return new ServiceResponse
            {
                Message = "All categories are loaded.",
                Success = true,
                Payload = categories
            };
        }
        public async Task<ServiceResponse> GetCategoryByIdAsync(string id)
        {
            Category currentCategory = await _categoryRepository.GetByIdAsync(id);
            if (currentCategory == null)
            {
                return new ServiceResponse
                {
                    Message = "Category isn't found.",
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
        public async Task<ServiceResponse> EditCategoryAsync(Category model)
        {
            // if the name is empty
            if (String.IsNullOrWhiteSpace(model.Name))
            {
                return new ServiceResponse
                {
                    Message = "The name mustn't be empty.",
                    Success = false
                };
            }
            // check if the name is occupied by another category
            var isNameOccupied = await _categoryRepository.GetIsNameExistAsync(model.Name);
            if (isNameOccupied)
            {
                return new ServiceResponse
                {
                    Message = "The name is occupied already.",
                    Success = false
                };
            }
            // update category
            var result = _categoryRepository.UpdateCategory(model);
            if (result)
            {
                return new ServiceResponse
                {
                    Message = "Category is updated.",
                    Success = true
                };
            }
            // if category couldn't be updated
            return new ServiceResponse
            {
                Message = "Category couldn't be updated.",
                Success = false
            };
        }
        public async Task<ServiceResponse> DeleteCategoryAsync(string id)
        {
            var currentCategory = await GetCategoryByIdAsync(id);
            if (!currentCategory.Success)
            {
                return new ServiceResponse
                {
                    Message = "Category isn't found.",
                    Success = false
                };
            }
            var courseResult = _courseRepository.ClearCategoryId(id); // clears categoryId from courses table
            if (courseResult)
            {
                var result = _categoryRepository.RemoveCategory((Category)currentCategory.Payload); // removes category from db
                if (result)
                {

                    return new ServiceResponse
                    {
                        Message = "Category is deleted.",
                        Success = true
                    };
                }
            }
            return new ServiceResponse
            {
                Message = "Category couldn't be deleted.",
                Success = false
            };
        }
        public async Task<ServiceResponse> AddCategoryAsync(string name)
        {
            Category model = new Category { Name = name };
            if (String.IsNullOrEmpty(model.Name))
            {
                return new ServiceResponse
                {
                    Message = "Name mustn't be empty.",
                    Success = false
                };
            }
            List<Category> categories = await _categoryRepository.GetAllAsync();
            if (categories.Find(c => c.Name == model.Name) != null)
            {
                return new ServiceResponse
                {
                    Message = "The name is occupied already.",
                    Success = false
                };
            }
            model.Id = Guid.NewGuid().ToString();
            var result = _categoryRepository.AddCategory(model);
            if (result)
            {
                return new ServiceResponse
                {
                    Message = "Category is added.",
                    Success = true
                };
            }
            return new ServiceResponse
            {
                Message = "Category couldn't be added",
                Success = false
            };
        }
    }
}
