using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Learn.BusinessLogic.Services
{
    public class ServiceResponse // відповідь від сервера буде
    {
        public string Message { get; set; } // повідомлення яке будем надсилати з сервіса на контролер
        public bool Success { get; set; } // це буде показувати відповідь чи ні
        public object Payload { get; set; } // тут будуть знаходитись які данні (юзер, продукт шось типу того)
        public IEnumerable<string> Errors { get; set; } // список стрінгів з помилками
    }
}
