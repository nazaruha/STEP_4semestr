"use strict";
// Дан двумерный массив размерностью 5×5, заполнен случайными числами из диапазона от –100 до 100.
// Определить сумму элементов массива, расположенных
// между минимальным и максимальным элементами
class _2DArray {
    constructor() {
        this.arr = [];
        this.row = 5;
        this.col = 5;
        this.Initialize();
        this.Fill();
        this.Print();
    }
    Initialize() {
        for (let i = 0; i < this.row; i++) {
            this.arr[i] = new Array(this.col);
        }
    }
    Fill() {
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
                let rnd_num = Math.floor(Math.random() * 201) - 100; // -100 to 100 rnd
                if (this.UniqueNumber(i + 1, rnd_num) === true) {
                    j -= 1;
                    continue;
                }
                this.arr[i][j] = rnd_num;
            }
        }
    }
    UniqueNumber(rows, rnd_num) {
        for (let i = 0; i < rows; i++) {
            if (this.arr[i].includes(rnd_num)) {
                return true;
            }
        }
        return false;
    }
    Print() {
        console.table(this.arr);
    }
    Max() {
        let max = -239283;
        this.arr.forEach(row => {
            row.forEach(element => {
                if (max < element) {
                    max = element;
                }
            });
        });
        return max;
    }
    Min() {
        let min = 10930;
        this.arr.forEach(row => {
            row.forEach(element => {
                if (min > element) {
                    min = element;
                }
            });
        });
        return min;
    }
    SumBetweenMinAndMax() {
        const min = this.Min();
        const max = this.Max();
        let min_index = this.GetNumberIndex(min);
        console.log(`min index: ${min_index}`);
        let max_index = this.GetNumberIndex(max);
        console.log(`max index: ${max_index}`);
        if (min_index[0] === -1 || max_index[0] === -1) {
            if (min_index[0] === -1) {
                console.log("couldn't find min value index");
                return -1;
            }
            console.log("couldn't find max value index");
            return -1;
        }
        let sum = 0;
        // debugger;
        if (min_index === max_index) {
            return sum;
        }
        if (min_index[0] === max_index[0]) { // works
            if (min_index[1] > max_index[1]) {
                const tmp = max_index[1];
                max_index[1] = min_index[1];
                min_index[1] = tmp;
                for (let i = min_index[1] + 1; i < max_index[1]; i++) {
                    sum += this.arr[min_index[0]][i];
                }
                return sum;
            }
            for (let i = min_index[1] + 1; i < max_index[1]; i++) {
                sum += this.arr[min_index[0]][i];
            }
            return sum;
        }
        if (min_index[0] > max_index[0]) { // works
            this.arr.reverse();
            console.table(this.arr);
            min_index = this.GetNumberIndex(min);
            console.log(`min index: ${min_index}`);
            max_index = this.GetNumberIndex(max);
            console.log(`max index: ${max_index}`);
        }
        sum = this.MakeThisStupidSum(min_index, max_index);
        return sum;
    }
    GetNumberIndex(num) {
        let rowIndex = this.arr.findIndex(row => row.includes(num));
        if (rowIndex === -1) {
            return [-1, -1];
        }
        let colIndex = this.arr[rowIndex].findIndex(col => col === num);
        const indexes = [rowIndex, colIndex];
        return indexes;
    }
    MakeThisStupidSum(min_index, max_index) {
        let sum = 0;
        for (let i = min_index[0]; i < max_index[0] + 1; i++) {
            if (i === min_index[0]) {
                if (min_index[1] != this.arr[i].length - 1) {
                    for (let m = min_index[1] + 1; m < this.arr[i].length; m++) {
                        console.log(`[${i};${m}] = ${this.arr[i][m]}`);
                        sum += this.arr[i][m];
                    }
                }
                continue;
            }
            if (i === max_index[0]) {
                if (max_index[1] != 0) {
                    for (let n = 0; n < max_index[1]; n++) {
                        console.log(`[${i};${n}] = ${this.arr[i][n]}`);
                        sum += this.arr[i][n];
                    }
                }
                continue;
            }
            if (i === max_index[0] && max_index[1] === 0) {
                return sum;
            }
            // if (i !== min_index[0] || i !== max_index[0]) {
            // }
            for (let j = 0; j < this.arr[i].length; j++) {
                console.log(`[${i};${j}] = ${this.arr[i][j]}`);
                sum += this.arr[i][j];
            }
        }
        return sum;
    }
}
let arr = new _2DArray();
console.log(arr.SumBetweenMinAndMax());
