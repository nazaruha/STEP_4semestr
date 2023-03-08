var num1 = 10;
var num2 = 5;
function Plus(a, b) {
    return a + b;
}
console.log(Plus(num1, num2));
var Person = /** @class */ (function () {
    function Person(name, surname, age) {
        this.Name = name;
        this.Surname = surname;
        this.Age = age;
    }
    Person.prototype.Print = function () {
        console.log("Name: ".concat(this.Name, "\nSurname: ").concat(this.Surname, "\nAge: ").concat(this.Age));
    };
    return Person;
}());
var Bill = new Person("Bill", "Jackson", 32);
Bill.Print();
