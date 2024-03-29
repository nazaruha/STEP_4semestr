﻿using E_Learn.DataAccess.Data.Models.Categories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security;
using System.Text;
using System.Threading.Tasks;

namespace E_Learn.DataAccess.Data.IRepository
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetAllAsync();
        Task<Category> GetByIdAsync(string id);
        Task<bool> GetIsNameExistAsync(string name);
        bool UpdateCategory(Category model);
        bool RemoveCategory(Category model);
        bool AddCategory(Category model);
    }
}
