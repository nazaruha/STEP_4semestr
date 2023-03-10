// Оголосити три масива. Перші два заповнити випадковими
// значеннями від 10 до 30.
// В елементи третього масиву записати суму відповідних елементів перших двох
// масивів. (В нульову комірку третього
// суму нульових елементів першого і другого
// масивів і так далі). Потім знайти середнє арифметичне елементів третього ма
// сиву, максимальне значення і мінімальне значення, які він зберігає

interface IArray {
    Print(): void;
    FillRand(): void;
    SumOfTwoArrs(arr1: _Array, arr2: _Array): any;
    Average(): number;
    Max(): number;
    Min(): number;
}

class _Array implements IArray {
    public arr: number[] = [];
    private arrLength: number = 10;

    constructor() {
        this.FillRand();
    }

    public Print(): void {
        console.log(this.arr);
    }
    public FillRand(): void {
        const min: number = 10;
        const max: number = 21;

        for(let i = 0; i < this.arrLength; i++) {
            this.arr.push(Math.floor(Math.random() * max) + min);
        }
    }
    public SumOfTwoArrs(arr1: _Array, arr2: _Array): any {
        for (let i = 0; i < this.arrLength; i++) {
            this.arr[i] = arr1.arr[i] + arr2.arr[i];
        }
        console.log(this.arr);
    }
    public Average(): number {
        const sum: number = this.SumOfElements();

        return (sum / this.arr.length);
    }
    private SumOfElements(): number {
        let sum: number = 0;

        this.arr.forEach(element => {
            sum += element;
        })

        return sum;
    }
    public Max(): number {
        let max = -3232;

        this.arr.forEach(element => {
            if (max < element) {
                max = element;
            }
        })

        return max;
    }
    public Min(): number {
        let min = 100000;
        
        this.arr.forEach(element => {
            if (min > element) {
                min = element;
            }
        })
        
        return min;
    }
}

let arr1: _Array = new _Array();
let arr2: _Array = new _Array();
let arr3: _Array = new _Array();

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