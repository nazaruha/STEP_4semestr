"use strict";
// Оголосити три масива. Перші два заповнити випадковими
// значеннями від 10 до 30.
// В елементи третього масиву записати суму відповідних елементів перших двох
// масивів. (В нульову комірку третього
// суму нульових елементів першого і другого
// масивів і так далі). Потім знайти середнє арифметичне елементів третього ма
// сиву, максимальне значення і мінімальне значення, які він зберігає
class _Array {
    constructor() {
        this.arr = [];
        this.arrLength = 10;
        this.FillRand();
    }
    Print() {
        console.log(this.arr);
    }
    FillRand() {
        const min = 10;
        const max = 21;
        for (let i = 0; i < this.arrLength; i++) {
            this.arr.push(Math.floor(Math.random() * max) + min);
        }
    }
    SumOfTwoArrs(arr1, arr2) {
        for (let i = 0; i < this.arrLength; i++) {
            this.arr[i] = arr1.arr[i] + arr2.arr[i];
        }
        console.log(this.arr);
    }
    Average() {
        const sum = this.SumOfElements();
        return (sum / this.arr.length);
    }
    SumOfElements() {
        let sum = 0;
        this.arr.forEach(element => {
            sum += element;
        });
        return sum;
    }
    Max() {
        let max = -3232;
        this.arr.forEach(element => {
            if (max < element) {
                max = element;
            }
        });
        return max;
    }
    Min() {
        let min = 100000;
        this.arr.forEach(element => {
            if (min > element) {
                min = element;
            }
        });
        return min;
    }
}
let arr1 = new _Array();
let arr2 = new _Array();
let arr3 = new _Array();
console.log("*** ARR1 ***");
arr1.Print();
console.log("*** ARR2 ***");
arr2.Print();
console.log("*** ARR1 + ARR2 ***");
arr3.SumOfTwoArrs(arr1, arr2);
console.log("*** AVG ARR3 ***");
console.log(arr3.Average());
console.log("*** MAX ARR3 ***");
console.log(arr3.Max());
console.log("*** MIN ARR3 ***");
console.log(arr3.Min());
