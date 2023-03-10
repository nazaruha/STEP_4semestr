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

interface IAuto {
    Print(): string;
    SetMark(mark: string): void;
    SetModel(model: string): void;
    SetEngine(engine: string): void;
    SetColor(color: string): void;
    GetMark(): string;
    GetModel(): string;
    GetEngine(): string;
    GetColor(): string;
    GetBodyId(): number;
}

var Id: number = 1000;

class Auto implements IAuto {
    private Mark: string = "";    
    private Model: string = "";
    private Engine: string = "";
    private Color: string = "";
    private BodyId: number = -1;

    constructor(mark: string, model: string, engine: string, color: string) {
        this.SetMark(mark);
        this.SetModel(model);
        this.SetEngine(engine);
        this.SetColor(color);
        this.SetBodyId();
    }

    public Print() {
        return `Mark = ${this.Mark};\tModel = ${this.Model};\tEngine = ${this.Engine};\tColor = ${this.Color}.\tId = ${this.BodyId}\n`;
    }
    public SetMark(mark: string): void {
        this.Mark = mark;
    }
    public SetModel(model: string): void {
        this.Model = model;
    }
    public SetEngine(engine: string): void {
        this.Engine = engine;
    }
    public SetColor(color: string): void {
        this.Color = color;
    }
    private SetBodyId(): void {
        this.BodyId = Id++;
    }
    public GetMark(): string {
        return this.Mark;
    }
    public GetModel(): string {
        return this.Model;
    }
    public GetEngine(): string {
        return this.Engine;
    }
    public GetColor(): string {
        return this.Color;
    }
    public GetBodyId(): number {
        return this.BodyId;
    }
}

interface IAutoWorker {
    Print(): void;
    Add(auto: Auto): void;
    DeleteById(id: number): void;
}

class AutoWorker implements IAutoWorker {
    private autos: Auto[] = [];

    public Print(): void {
        if (this.autos.length == 0) {
            console.log("Empty");
        }
        this.autos.forEach(auto => {
            console.log(auto.Print());
        })
    }
    public Add(auto: Auto): void {
        if (this.autos.find(a => a.GetBodyId() === auto.GetBodyId()) !== undefined){
            console.log("Auto is occupied!");
        }
        else {
            this.autos.push(auto);
        }
    }
    public DeleteById(id: number): void {
        const index: number = this.autos.findIndex(a => a.GetBodyId() === id);
        if (index === -1) {
            console.log("\nThe car isn't found.")
        }
        else {
            // debugger;
            const arr1: Auto[] = this.autos.slice(0, index);
            const arr2: Auto[] = this.autos.slice(index + 1);
            this.autos = [];
            this.autos = this.autos.concat(arr1, arr2)
            console.log("\nCar is deleted.");
        }
    }

}

// debugger;
let a1: Auto = new Auto("m1", "m11", "kjsdkjs", "red");
let a2: Auto = new Auto("m2", "m21", "kjsdkjssdsd", "yellow");
let a3: Auto = new Auto("m3", "m31", "sldksld", "purple");
let a4: Auto = new Auto("m4", "m41", "xxxx", "green");
let a5: Auto = new Auto("m5", "m51", "dvmfoi", "white");

let aArr: AutoWorker = new AutoWorker();
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
