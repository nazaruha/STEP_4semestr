let num1: number = 10;
let num2: number = 5;

function Plus(a: number, b: number): number{ // number - повертає число. void - нічо не повертає
    return a + b;
}


console.log(Plus(num1, num2));

// let arr: number | boolean = [1,5,6,7,8, false]; // може два типа приймати, але в основному це юзлес

interface IPrint {
    Print(): void;
}

class Person implements IPrint {
    private Name;
    private Surname;
    private Age;

    constructor(name: string, surname: string, age: number) {
        this.Name = name;
        this.Surname = surname;
        this.Age = age;
    }

    public Print(): void {
        console.log(`Name: ${this.Name}\nSurname: ${this.Surname}\nAge: ${this.Age}`);
    }
}

let Bill = new Person("Bill", "Jackson", 32);
Bill.Print();