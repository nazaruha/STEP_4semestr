using AutoMapper;
using E_Learn.DataAccess.Data.Context;
using E_Learn.DataAccess.Data.Models.Category;
using E_Learn.DataAccess.Data.Models.User;
using E_Learn.DataAccess.Data.Models.ViewModel.Category;
using E_Learn.DataAccess.Data.Models.ViewModel.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Exchange.WebServices.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.Identity.Client;
using Microsoft.IdentityModel.Abstractions;
using Org.BouncyCastle.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace E_Learn.BusinessLogic.Services
{
    // connect it to the UserManager and SignInManager. We can access to the user's DB due to them. These classes are aready in Identity
    public class UserService
    {
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration; // for sending emails
        private readonly UserManager<AppUser> _userManager; // connect our userManager<DB>
        private readonly SignInManager<AppUser> _signInManager; // connect our sign in manager
        private readonly EmailService _emailService;
        private readonly AppDbContext context;

        public UserService(EmailService emailService, IConfiguration configuration, IMapper mapper, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, AppDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
            _configuration = configuration;
            _emailService = emailService;
            this.context = context;
        }
        public async Task<ServiceResponse> SignInUserAsync(SignInUserVM model) // add Async if function is asynchronimum
        {
            //var mappedUser = _mapper.Map<SignInUserVM, AppUser>(model); // convert SignInUserVM into AppUser
            //var verifyPassword = await _userManager.CheckPasswordAsync(mappedUser, model.Password); // checks if the user's password is correct. returns bool
            //if (verifyPassword) // if password is correct
            //{
            //    await _signInManager.SignInAsync(mappedUser, false); // Sign in our user
            //}
            //return model;

            var user = await _userManager.FindByEmailAsync(model.Email); // finds user by email
            if (user == null)
            {
                return new ServiceResponse
                {
                    Message = "User or password is incorrect.", // не пишемо 'User not found.' бо цим користуються зловмисники
                    Success = false, // false - означає що невдалий запис. Ми очікували шось нормальне
                };
            }
            var verifyPassword = await _signInManager.PasswordSignInAsync(user, model.Password, model.RememberMe, lockoutOnFailure: true); // checks if the user's password is correct. returns bool
            if (verifyPassword.Succeeded) // if password is correct
            {
                await _signInManager.SignInAsync(user, false); // Signs in our user
                return new ServiceResponse
                {
                    Message = "User logged in successfully.",
                    Success = true
                };
            }
            if (verifyPassword.IsNotAllowed) // true if email is not confirmed
            {
                return new ServiceResponse
                {
                    Message = "Confirm your email.",
                    Success = false
                };
            }
            if (verifyPassword.IsLockedOut) // you've went over of failed logged in
            {
                return new ServiceResponse
                {
                    Message = "Your account is blocked. Connect with administrator",
                    Success = false
                };
            }
            return new ServiceResponse
            {
                Message = "User or password is incorrect.",
                Success = false
            };
        }
        public async Task<ServiceResponse> SignUpUserAsync(SignUpUserVM model)
        {
            var mappedUser = _mapper.Map<SignUpUserVM, AppUser>(model);
            mappedUser.UserName = model.Email;
            var result = await _userManager.CreateAsync(mappedUser, model.Password);
            if (result.Succeeded) // якщо юзер створився успішно
            {                
                await _userManager.AddToRoleAsync(mappedUser, model.Role); // додаєм юзера в роль
                await SendConfigurationEmailAsync(mappedUser); // send to email configuration letter to confirm password
                return new ServiceResponse
                {
                    Message = "User is successfully registered",
                    Success = true
                };
            }
            List<IdentityError> errorList = result.Errors.ToList();
            string errors = "";
            foreach (var itemError in errorList)
            {
                errors += itemError.Description.ToString(); // Description - gets or sets description of error
            }
            return new ServiceResponse
            {
                Message = errors,
                Success = false
            };
        }
        public async Task<ServiceResponse> LogoutUserAsync()
        {
            await _signInManager.SignOutAsync();
            return new ServiceResponse
            {
                Message = "User logged out.",
                Success = true
            };
        }

        public async Task<ServiceResponse> GetUserProfileAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId); // find user by email
            if (user == null) // if we didn't find him
            {
                return new ServiceResponse
                {
                    Message = "User not found.",
                    Success = false
                };
            }
            var roles = await _userManager.GetRolesAsync(user); // get user's roles list
            var mappedUser = _mapper.Map<AppUser, UserProfileVM>(user); // convert AppUser into UserProfileVM
            mappedUser.Role = roles[0]; // get our role
            return new ServiceResponse
            {
                Message = "User profile is loaded",
                Success = true,
                Payload = mappedUser
            };
        }

        public async Task<ServiceResponse> GetUserUpdateAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId); // find user by email
            if (user == null) // if we didn't find him
            {
                return new ServiceResponse
                {
                    Message = "User not found.",
                    Success = false
                };
            }
            var roles = await _userManager.GetRolesAsync(user); // get user's roles list
            var mappedUser = _mapper.Map<AppUser, UpdateProfileVM>(user); // convert AppUser into UserProfileVM
            mappedUser.Role = roles[0]; // get our role
            return new ServiceResponse
            {
                Message = "User profile is loaded",
                Success = true,
                Payload = mappedUser
            };
        }

        public async System.Threading.Tasks.Task SendConfigurationEmailAsync(AppUser newUser)
        {
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);

            var encodedEmailToken = Encoding.UTF8.GetBytes(token);
            var validEmailToken = WebEncoders.Base64UrlEncode(encodedEmailToken);

            string url = $"{_configuration["HostSettings:URL"]}/Admin/ConfirmEmail?userid={newUser.Id}&token={validEmailToken}";

            string emailBody = $"<h1>Confirm your email</h1> <a href='{url}'>Confirm now</a>";
            await _emailService.SendEmailAsync(newUser.Email, "Email confirmation.", emailBody);
        }

        public async Task<ServiceResponse> ConfirmEmailAsync(string userId, string token)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return new ServiceResponse
                {
                    Success = false,
                    Message = "User not found"
                };

            var decodedToken = WebEncoders.Base64UrlDecode(token);
            string normalToken = Encoding.UTF8.GetString(decodedToken);

            var result = await _userManager.ConfirmEmailAsync(user, normalToken);

            if (result.Succeeded)
                return new ServiceResponse
                {
                    Message = "Email confirmed successfully!",
                    Success = true,
                };

            return new ServiceResponse
            {
                Success = false,
                Message = "Email did not confirm",
                Errors = result.Errors.Select(e => e.Description)
            };
        }

        public async Task<ServiceResponse> UpdateUserProfileAsync(UpdateProfileVM model)
        {
            var user = await _userManager.FindByIdAsync(model.Id);
            // if user doesn't exists
            if (user == null)
            {
                return new ServiceResponse
                {
                    Message = "User not found.",
                    Success = false,
                    Payload = model
                };
            }
            // if email was changed
            if (user.Email != model.Email)
            {
                user.EmailConfirmed = false;
            }
            // if OldPassword is not the same with current password
            if (!String.IsNullOrEmpty(model.OldPassword) || model.OldPassword != null)
            {
                bool checkOldPassword = await _userManager.CheckPasswordAsync(user, model.OldPassword);
                if (!checkOldPassword)
                {
                    return new ServiceResponse
                    {
                        Message = "Old password is not correct",
                        Success = false,
                        Payload = model
                    };
                }
            }
            else
            {
                var mappedUser = _mapper.Map<AppUser, SignInUserVM>(user);
                model.OldPassword = mappedUser.Password;
            }
            // check confirm password
            if (model.Password != model.ConfirmPassword)
            {
                return new ServiceResponse
                {
                    Message = "Passwords don't match",
                    Success = false,
                    Payload = model
                };
            }
            // change other props
            user.Name = model.Name;
            user.Surname = model.Surname;
            user.Email = model.Email;
            user.UserName = model.Email;
            user.PhoneNumber = model.PhoneNumber;
            var changePassword = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.Password);
            if (changePassword.Succeeded)
            {
                var result = await _userManager.UpdateAsync(user);
                if (result.Succeeded)
                {
                    if (!user.EmailConfirmed)
                        await SendConfigurationEmailAsync(user);
                    await _signInManager.SignOutAsync();
                    return new ServiceResponse
                    {
                        Message = "User profile is successfully updated",
                        Success = true,
                    };
                }
            }
            return new ServiceResponse
            {
                Message = "Password hasn't changed.",
                Success = false,
                Payload = model
            };
        }
        public async Task<ServiceResponse> GetCategories()
        {
            List<Category> categories = await context.Categories.ToListAsync();
            List<CategoryVM> mappedCategories = categories.Select(c => _mapper.Map<Category, CategoryVM>(c)).ToList();
            return new ServiceResponse
            {
                Message = "All categories are loaded.",
                Success = true,
                Payload = mappedCategories
            };
        }

        public async Task<ServiceResponse> GetUserListAsync()
        {
            // My Code

            //var usersFromDb = await _userManager.Users.ToListAsync();
            //List <ListUserVM> mappedUsersList = new List <ListUserVM>();
            //foreach (var user in usersFromDb)
            //{
            //    var mappedUser = _mapper.Map<AppUser, ListUserVM>(user);
            //    mappedUsersList.Add(mappedUser);
            //}
            //return new ServiceResponse
            //{
            //    Success = true,
            //    Message = "all users loaded",
            //    Payload = mappedUsersList
            //};

            // Teacher code
            List<AppUser> users = await _userManager.Users.ToListAsync();
            List<ListUserVM> mappedUsers = users.Select(u => _mapper.Map<AppUser, ListUserVM>(u)).ToList();
            for (int i = 0; i < users.Count; i++)
            {
                mappedUsers[i].Role = (await _userManager.GetRolesAsync(users[i])).FirstOrDefault(); // get roles for each user
            }
            return new ServiceResponse
            {
                Success = true,
                Message = "All users loaded",
                Payload = mappedUsers
            };
        }
        public async Task<ServiceResponse> FindUserByIdAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return new ServiceResponse
                {
                    Message = "User not found",
                    Success = false,
                };
            }
            var role = await _userManager.GetRolesAsync(user);
            var mappedUser = _mapper.Map<AppUser, UpdateProfileVM>(user);
            mappedUser.Role = role[0];
            return new ServiceResponse
            {
                Message = "User is found",
                Success = true,
                Payload = mappedUser
            };
        }
        public async Task<ServiceResponse> UpdateListUserAsync(UpdateProfileVM model)
        {
            var user = await _userManager.FindByIdAsync(model.Id);
            if (user == null)
            {
                return new ServiceResponse
                {
                    Message = "User not found.",
                    Success = false
                };
            }
            user.Name = model.Name;
            user.Surname = model.Surname;
            user.PhoneNumber = model.PhoneNumber;
            if (user.Email != model.Email)
            {
                user.EmailConfirmed = false;
                user.Email = model.Email;
                user.UserName = model.Email;
                await SendConfigurationEmailAsync(user);
            }
            var isLockedResult = await _userManager.SetLockoutEnabledAsync(user, !model.isLocked);
            if (isLockedResult.Succeeded)
            {
                var updateResult = await _userManager.UpdateAsync(user);
                if (updateResult.Succeeded)
                {    
                    return new ServiceResponse
                    {
                        Message = "User is successfully updated!",
                        Success = true,
                    };
                }
            }

            List<IdentityError> errorList = new List<IdentityError>();
            string errors = "";
            foreach (var error in errorList)
            {
                errors += error.Description.ToString();
            }
            return new ServiceResponse
            {
                Message = errors,
                Success = false
            };
        }
        public async Task<ServiceResponse> ForgotPasswordAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user== null)
            {
                return new ServiceResponse
                {
                    Message = "User not found with this email",
                    Success = false
                };
            }

            // token - токен, який нам якусь хуйню зебезпечує я хз (треба погуглить)
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var encodedToken = Encoding.UTF8.GetBytes(token);
            var validToken = WebEncoders.Base64UrlEncode(encodedToken);

            string url = $"{_configuration["HostSettings:URL"]}/Admin/ResetPassword?email={email}&token={validToken}";
            string emailBody = "<h1>Follow the instructions </h1>" + $"<p>To reset your password. <a href=\"{url}\">click this button</a>";
            await _emailService.SendEmailAsync(email, "Forgot password", emailBody);

            return new ServiceResponse
            {
                Success = true,
                Message = "Reset code has been sent to the email"
            };
        }
        public async Task<ServiceResponse> ResetPasswordAsync(ResetPasswordVM model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return new ServiceResponse
                {
                    Message = "User not found",
                    Success = false
                };
            }

            if (model.NewPassword != model.ConfirmPassword) // additional checking. для підстраховки
            {
                return new ServiceResponse
                {
                    Message = "Passwords are not equal",
                    Success = false
                };
            }
            var decodedToken = WebEncoders.Base64UrlDecode(model.Token);
            string normalToken = Encoding.UTF8.GetString(decodedToken);
            var result = await _userManager.ResetPasswordAsync(user, normalToken, model.NewPassword);
            if (result.Succeeded) 
            {
                return new ServiceResponse
                {
                    Success = true,
                    Message = "Password is successfully changed."
                };
            }

            return new ServiceResponse
            {
                Success = false,
                Message = "Unknown error.",
                Errors = result.Errors.Select(e => e.Description)
            };
        }
    }
}
