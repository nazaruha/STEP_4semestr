"use strict";
// Створити масив об'єктів вибраного класу
// Варіанти
// класів на вибір
// 1.Автомобіль; + SELECTED
// 2.Мотоцикл;
// 3.Літак;
// 4.Побутова техніка (навибір);
// 5.Меблі (на вибір);
// 6.Ракета;
// 7.Потяг;
// 8.Електронний пристрій (на вибір)
// І т.д.has context menu
var Id = 1000;
class Auto {
    constructor(mark, model, engine, color) {
        this.Mark = "";
        this.Model = "";
        this.Engine = "";
        this.Color = "";
        this.BodyId = -1;
        this.SetMark(mark);
        this.SetModel(model);
        this.SetEngine(engine);
        this.SetColor(color);
        this.SetBodyId();
    }
    Print() {
        return `Mark = ${this.Mark};\tModel = ${this.Model};\tEngine = ${this.Engine};\tColor = ${this.Color}.\tId = ${this.BodyId}\n`;
    }
    SetMark(mark) {
        this.Mark = mark;
    }
    SetModel(model) {
        this.Model = model;
    }
    SetEngine(engine) {
        this.Engine = engine;
    }
    SetColor(color) {
        this.Color = color;
    }
    SetBodyId() {
        this.BodyId = Id++;
    }
    GetMark() {
        return this.Mark;
    }
    GetModel() {
        return this.Model;
    }
    GetEngine() {
        return this.Engine;
    }
    GetColor() {
        return this.Color;
    }
    GetBodyId() {
        return this.BodyId;
    }
}
class AutoWorker {
    constructor() {
        this.autos = [];
    }
    Print() {
        if (this.autos.length == 0) {
            console.log("Empty");
        }
        this.autos.forEach(auto => {
            console.log(auto.Print());
        });
    }
    Add(auto) {
        if (this.autos.find(a => a.GetBodyId() === auto.GetBodyId()) !== undefined) {
            console.log("Auto is occupied!");
        }
        else {
            this.autos.push(auto);
        }
    }
    DeleteById(id) {
        const index = this.autos.findIndex(a => a.GetBodyId() === id);
        if (index === -1) {
            console.log("\nThe car isn't found.");
        }
        else {
            // debugger;
            const arr1 = this.autos.slice(0, index);
            const arr2 = this.autos.slice(index + 1);
            this.autos = [];
            this.autos = this.autos.concat(arr1, arr2);
            console.log("\nCar is deleted.");
        }
    }
}
// debugger;
let a1 = new Auto("m1", "m11", "kjsdkjs", "red");
let a2 = new Auto("m2", "m21", "kjsdkjssdsd", "yellow");
let a3 = new Auto("m3", "m31", "sldksld", "purple");
let a4 = new Auto("m4", "m41", "xxxx", "green");
let a5 = new Auto("m5", "m51", "dvmfoi", "white");
let aArr = new AutoWorker();
aArr.Add(a1);
aArr.Add(a2);
aArr.Add(a3);
aArr.Add(a4);
aArr.Add(a5);
aArr.Print();
aArr.DeleteById(1002);
aArr.Print();
aArr.DeleteById(1005);
aArr.Print();
