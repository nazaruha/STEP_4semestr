﻿using AutoMapper;
using Compass.Core.DTO_s;
using Compass.Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Core.Services
{
    public class UserService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly JwtService _jwtService;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IMapper _mapper;

        public UserService(JwtService jwtService, UserManager<AppUser> userManager, IMapper mapper, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _mapper = mapper;
            _signInManager = signInManager;
            _jwtService = jwtService;
        }

        public async Task<ServiceResponse> GetAllUsers()
        {
            List<AppUser> users = await _userManager.Users.ToListAsync();
            List<AllUsersDto> mappedUsers = users.Select(u => _mapper.Map<AppUser, AllUsersDto>(u)).ToList();

            for (int i = 0; i < users.Count; i++)
            {
                mappedUsers[i].Role = (await _userManager.GetRolesAsync(users[i])).FirstOrDefault();
            }
            return new ServiceResponse
            {
                Success = true,
                Message = "All users loaded",
                Payload = mappedUsers
            };

        }


        public async Task<ServiceResponse> IncertAsync(ResiterUserDto model)
        {
            var mappedUser = _mapper.Map<AppUser>(model);
            var result = await _userManager.CreateAsync(mappedUser, model.Password);
            if(result.Succeeded)
            {
                await _userManager.AddToRoleAsync(mappedUser, model.Role);

                return new ServiceResponse
                {
                    Success = true,
                    Message = "User successfully created."
                };
            }
            else
            {

                return new ServiceResponse
                {
                    Success = false,
                    Message = result.Errors.Select(e => e.Description).FirstOrDefault()
                };
            }
        }

        public async Task<ServiceResponse> LoginAsync(LoginUserDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if(user == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "Login or password incorrect."
                };
            }

            var signInResult = await _signInManager.PasswordSignInAsync(user, model.Password, model.RememberMe, lockoutOnFailure: true);
            if(signInResult.Succeeded)
            {

                var tokens = await _jwtService.GenerateJwtTokenAsync(user);

                return new ServiceResponse
                {
                    AccessToken = tokens.token,
                    RefreshToken = tokens.refreshToken.Token,
                    Success = true,
                    Message = "User logged in successfully."
                };
            }
            else if (signInResult.IsNotAllowed)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "Confirm your email."
                };
            }
            else if (signInResult.IsLockedOut)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "User is blocked."
                };
            }
            else
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "Login or password incorrect."
                };
            }
        }

        public async Task<ServiceResponse> LogoutAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if(user == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "User not found."
                };
            }
            IEnumerable<RefreshToken> tokens = await _jwtService.GetAll();
            foreach (RefreshToken token in tokens)
            {
                await _jwtService.Delete(token);
            }

            return new ServiceResponse
            {
                Success = true,
                Message = "User successfully logged out."
            };
        }

        public async Task<ServiceResponse> RefreshTokenAsync(TokenRequestDto model)
        {
            return await _jwtService.VerifyTokenAsync(model);
        }
    }
}
