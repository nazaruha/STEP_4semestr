"use strict";
// Описати class «User». Передбачити:
// 1. Заповнення масиву користувачів
// 2. Вивід інформації на екран
// 3. Додати нового користувача
// 4. Пошук по прізвищу
class User {
    constructor(nickname, email, password) {
        this.Nickname = nickname;
        this.Email = email;
        this.Password = password;
    }
    Print() {
        return `Nickname: ${this.Nickname} || Email: ${this.Email} || Password: ${this.Password}`;
    }
    GetNickname() {
        return this.Nickname;
    }
    GetEmail() {
        return this.Email;
    }
}
class UserWorker {
    constructor() {
        this.users = [];
    }
    Fill(count) {
        for (let i = 0; i < count; i++) {
            let nickname = this.CreateNickname();
            let email = this.CreateEmail();
            if (this.users.some(u => u.GetNickname() === nickname || u.GetEmail() === email)) {
                i -= 1;
                continue;
            }
            let password = this.CreatePassword();
            this.users.push(new User(nickname, email, password));
        }
    }
    Print() {
        if (this.users.length != 0) {
            let i = 0;
            while (i < this.users.length) {
                console.log(`#${i + 1} -> ${this.users[i].Print()}`);
                i += 1;
            }
        }
        else {
            console.log("Empty");
        }
    }
    Add(nickname, email, password) {
        if (this.users.some(u => u.GetNickname() === nickname || u.GetEmail() === email)) {
            console.log("Email or Nickname is occupied");
        }
        else {
            this.users.push(new User(nickname, email, password));
        }
    }
    GetByNickname(nickname) {
        return this.users.find(u => u.GetNickname() === nickname);
    }
    CreateNickname() {
        let alphabet = "qQwWeErRtTyYuUiIoOpPaAsSdDfFgGhHjJkKlLzZxXcCvVbBnNmM";
        let nickname = "";
        for (let i = 0; i < 9; i++) {
            nickname += alphabet[Math.floor((Math.random() * alphabet.length))];
        }
        return nickname;
    }
    CreateEmail() {
        let alphabet = "qQwWeErRtTyYuUiIoOpPaAsSdDfFgGhHjJkKlLzZxXcCvVbBnNmM";
        let number = "1234567890";
        let email = "";
        for (let i = 0; i < 18; i++) {
            if (i >= 9) {
                email += number[Math.floor((Math.random() * number.length))];
                continue;
            }
            email += alphabet[Math.floor((Math.random() * alphabet.length))];
        }
        return (email + "@gmail.com");
    }
    CreatePassword() {
        let alphabet = "qQwWeErRtTyYuUiIoOpPaAsSdDfFgGhHjJkKlLzZxXcCvVbBnNmM";
        let number = "1234567890";
        let symbols = "!@#$%^&*()_+-=.[]";
        let password = "";
        for (let i = 0; i < 9; i++) {
            password += alphabet[Math.floor((Math.random() * alphabet.length))];
        }
        for (let i = 0; i < 9; i++) {
            let flag = Boolean(Math.floor(Math.random() * 2));
            if (flag) {
                password += number[Math.floor(Math.random() * number.length)];
            }
            else {
                password += symbols[Math.floor(Math.random() * symbols.length)];
            }
        }
        return password;
    }
}
let users = new UserWorker();
users.Fill(3);
users.Print();
users.Add("Nazar", "Email@gmail.com", "osdlsdlks");
console.log(users.GetByNickname("Nazar"));
