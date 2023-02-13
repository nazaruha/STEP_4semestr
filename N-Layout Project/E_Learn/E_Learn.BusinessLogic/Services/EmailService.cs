using MailKit.Net.Smtp;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Identity.Client;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Learn.BusinessLogic.Services
{
    public class EmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration; 
        }

        public async Task SendEmailAsync(string toEmail, string subject, string body) // this Task returns nothing
        {
            string fromEmail = _configuration["EmailSettings:user"];
            string SMTP = _configuration["EmailSettings:SMTP"];
            int PORT = Int32.Parse(_configuration["EmailSettings:PORT"]);
            string password = _configuration["EmailSettings:Password"];

            // download MailKit package to use MimeMessage etc.
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(fromEmail));
            email.To.Add(MailboxAddress.Parse(toEmail));
            email.Subject = subject;

            var bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = body;
            email.Body = bodyBuilder.ToMessageBody();

            // Send email
            using (var smtp = new SmtpClient())
            {
                smtp.Connect(SMTP, PORT, MailKit.Security.SecureSocketOptions.SslOnConnect);
                smtp.Authenticate(fromEmail, password);
                await smtp.SendAsync(email);
                smtp.Disconnect(true);
            }
        }
    }
}
