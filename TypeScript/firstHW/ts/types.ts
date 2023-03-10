// Описати class «User». Передбачити:
// 1. Заповнення масиву користувачів
// 2. Вивід інформації на екран
// 3. Додати нового користувача
// 4. Пошук по прізвищу

interface IUser {
    Print(): string;
    GetNickname(): string;
    GetEmail(): string;
}

class User implements IUser {
    private Nickname: string;
    private Email: string;
    private Password: string;

    constructor(nickname: string, email: string, password: string){
        this.Nickname = nickname;
        this.Email = email;
        this.Password = password;
    }

    public Print(): string {
        return `Nickname: ${this.Nickname} || Email: ${this.Email} || Password: ${this.Password}`;
    } 
    public GetNickname(): string {
        return this.Nickname;
    }
    public GetEmail(): string {
        return this.Email;
    }
}

interface IUserWorker {
    Fill(count: number): void;
    Print(): void;
    Add(nickname: string, email: string, password: string): void;
    GetByNickname(nickname: string): User | undefined;
}

class UserWorker implements IUserWorker {
    private users: User[] = [];

    public Fill(count: number): void {
        for(let i = 0; i < count; i++) {
            let nickname: string = this.CreateNickname();
            let email: string = this.CreateEmail();
            if (this.users.some(u => u.GetNickname() === nickname || u.GetEmail() === email)) {
                i -= 1;
                continue;
            }
            let password: string = this.CreatePassword();
            this.users.push(new User(nickname, email, password));
        }
    }
    public Print(): void {
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
    public Add(nickname: string, email: string, password: string): void {
        if  (this.users.some(u => u.GetNickname() === nickname || u.GetEmail() === email)) {
            console.log("Email or Nickname is occupied");
        }
        else {
            this.users.push(new User(nickname, email, password));
        }
    }
    public GetByNickname(nickname: string): User | undefined {
        return this.users.find(u => u.GetNickname() === nickname);
    }
    private CreateNickname(): string {
        let alphabet: string = "qQwWeErRtTyYuUiIoOpPaAsSdDfFgGhHjJkKlLzZxXcCvVbBnNmM";
        let nickname: string = "";
        for (let i = 0; i < 9; i++) {
            nickname += alphabet[Math.floor((Math.random() * alphabet.length))];
        }
        return nickname;
    }
    private CreateEmail(): string {
        let alphabet: string = "qQwWeErRtTyYuUiIoOpPaAsSdDfFgGhHjJkKlLzZxXcCvVbBnNmM";
        let number: string = "1234567890";
        let email: string = "";
        
        for(let i = 0; i < 18; i++) {
            if (i >= 9) 
            {
                email += number[Math.floor((Math.random() * number.length))]
                continue;
            }
            email += alphabet[Math.floor((Math.random() * alphabet.length))]
        }
        return (email + "@gmail.com");
    }
    private CreatePassword(): string 
    {
        let alphabet: string = "qQwWeErRtTyYuUiIoOpPaAsSdDfFgGhHjJkKlLzZxXcCvVbBnNmM";
        let number: string = "1234567890";
        let symbols: string = "!@#$%^&*()_+-=.[]";
        let password: string = "";
        for (let i = 0; i < 9; i++) {
            password += alphabet[Math.floor((Math.random() * alphabet.length))];
        }
        for (let i = 0; i < 9; i++) {
            let flag: boolean = Boolean(Math.floor(Math.random() * 2));
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

let users: UserWorker = new UserWorker();
users.Fill(3);
users.Print();
users.Add("Nazar", "Email@gmail.com", "osdlsdlks");
console.log(users.GetByNickname("Nazar"));