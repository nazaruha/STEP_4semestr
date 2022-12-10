console.log("Works");

// let arr = [1, 4, "test", {Name: "Bill", Age: 19}, "apple", false, [32, "link"], 54];

// console.log(arr);
// console.log(arr[6][1]);



// const numberArr = [3,4,5,66767,688,788,9,3];
// for(let i = 0; i < numberArr.length; i++) {
//     console.log(numberArr[i]);
// }

// numberArr.forEach(element => {
//     console.log(element);
// });

// const newArr = numberArr.map(item => {
//     return item; // записується новий масив (numberArr)
// });

// console.log("\n\nnewArr");
// console.log(newArr);


// FUNCTION DECLARATAION/EXPRESSION
/*
const sum = Plus(3, 6); // Function Declaration - works before function initization
console.log(sum);

function Plus(a, b) {
    return a + b;
}

const Minus = function(a, b) { //Function Expression - cannot work before initialization
    return a - b;
}

const def = Minus(5, 7);
console.log(def);

const Division = (a, b) => a / b; // Arrow function

const div = Division(10, 2);
console.log(div);
*/


// FUNCTION CONSTRUCTOR
/*
function CreateDog(name, breed, age) { // function constructor - функція конструктор, функція яка створює екземпляр об'єкта
    this.Name = name;
    this.Breed = breed;
    this.Age = age;

    this.ShowInfo = function() {
        console.log(`Name: ${this.Name}\nBreed: ${this.Breed}\nAge: ${this.Age}`);
    }
}

const Tuzik = new CreateDog("Tuzik", "Taxa", 2);
Tuzik.ShowInfo();

const Sharik = new CreateDog("Sharik", "Bulldog", 4);
Sharik.ShowInfo();
*/


// АНОНІМНА ФУНКЦІЯ
// (function() { // Анонімна самовикликаюча функція
//     console.log("Annonimous function works.");
// }()/*ці дужки її викликають*/);


//CALLBACK ФУНКЦІЯ
/*
Request(Second)
function Request(Callback) { // Callback function - функція яка відпрацьовує іншу функцію
    Callback();
}

function First() {
    console.log("First");
}

function Second() {
    console.log("Second");
}
*/


window.addEventListener("load", Init);

//swapi URLs
const people_url = "https://swapi.dev/api/people";
const planet_url = "https://swapi.dev/api/planets";
const starship_url = "https://swapi.dev/api/starships";

const row = document.getElementById("root-row");
//paging buttons
const btnNext = document.getElementById("btnNext");
const btnPrev = document.getElementById("btnPrev");
//navbar links
const people_link = document.getElementById("people_link");
const planet_link = document.getElementById("planet_link");
const starship_link = document.getElementById("starship_link");

var current_data = null;

function Init() {
    const rootElement = document.getElementById("root");
    //console.log(rootElement);
    Request(starship_url, PrintData, ChangeMessage);
}

function Request(URL, Callback, CallBack2) {
    fetch(URL).then(response => {
        return response.json();
    }).then(data => {
        current_data = data;
        switch (URL) {
            case people_url:
                CallBack2("People");
                break;
            case planet_url:
                CallBack2("Planets");
                break;
            case starship_url:
                CallBack2("Starships");
                break;
        }
        Callback(URL, data);
    }).catch(error => console.log(error));
}

btnPrev.onclick = function() {
    fetch(current_data.previous).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        btnNext.disabled = false;
        if (data.previous == null) {
            btnPrev.disabled = true;
        }

        if (current_data.previous.includes("people")) {
            PrintPeople(data.results);
        }
        else if (current_data.previous.includes("planets")) {
            PrintPlanets(data.results);
        }
        else if (current_data.previous.includes("starships")) {
            PrintStarships(data.results);
        }

        current_data = data;
    }).catch(error => console.log(error))
}

btnNext.onclick = function() {
    fetch(current_data.next).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        btnPrev.disabled = false;
        if (data.next == null) {
            btnNext.disabled = true;
        }

        if (current_data.next.includes("people")) {
            PrintPeople(data.results);
        }
        else if (current_data.next.includes("planets")) {
            PrintPlanets(data.results);
        }
        else if (current_data.next.includes("starships")) {
            PrintStarships(data.results);
        }

        current_data = data;
    }).catch(error => console.log(error))
}

function NavbarLinkClick(e) {
    const id = e.getAttribute("id");
    switch (id) {
        case "planet_link": 
            Request(planet_url, PrintData, ChangeMessage);
            break;
        case "people_link":
            Request(people_url, PrintData, ChangeMessage);
            break;
        case "starship_link":
            Request(starship_url, PrintData, ChangeMessage);
            break;
    }
}

function PrintData(URL, data) {
    switch (URL) {
        case "https://swapi.dev/api/people":
            console.log("PEOPLE", data);
            PrintPeople(data.results);
            break;
        case "https://swapi.dev/api/planets":
            console.log("PLANETS", data);
            PrintPlanets(data.results);
            break;
        case "https://swapi.dev/api/starships":
            console.log("STARSHIPS", data);
            PrintStarships(data.results);
            break;
    }
}

function PrintPeople(data) {
    row.innerHTML = "";
    data.forEach( (element, index) => {
        row.innerHTML += `<div class="col-lg-4 col-md-6 mt-2">
        <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${element.name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${element.gender}</h6>
              <p class="card-text"><b>birth year:</b> ${element.birth_year}; <b>height:</b> ${element.height}; <b>mass:</b> ${element.mass}; <b>hair color:</b> ${element.hair_color}; <b>skin color:</b> ${element.skin_color}; <b>eye color:</b> ${element.eye_color}</p>
              <a href="https://swapi.dev/api/people/${index + 1}/" target="_blank" class="card-link">Card link</a>
              <a href="https://swapi.dev/api/people" class="card-link">Another link</a>
            </div>
          </div>
    </div>`
    });
}

function PrintPlanets(data) {
    row.innerHTML = "";
    data.forEach( (element, index) => {
        row.innerHTML += `<div class="col-lg-4 col-md-6 mt-2">
        <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${element.name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">population: ${element.population}</h6>
              <p class="card-text"><b>rotation speed:</b> ${element.rotation_period}; <b>orbital period:</b> ${element.orbital_period}; <b>diameter:</b> ${element.diameter}; <b>climate:</b> ${element.climate}; <b>gravity:</b> ${element.gravity}; <b>terrain:</b> ${element.terrain}</p>
              <a href="https://swapi.dev/api/planets/${index + 1}/" target="_blank" class="card-link">Card link</a>
              <a href="https://swapi.dev/api/planets" class="card-link">Another link</a>
            </div>
          </div>
    </div>`
    });
}

function PrintStarships(data) {
    row.innerHTML = "";
    data.forEach( (element, index) => {
        row.innerHTML += `<div class="col-lg-4 col-md-6 mt-2">
        <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${element.name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">population: ${element.model}</h6>
              <p class="card-text"><b>price: </b>${element.cost_in_credits}; <b>manufacturer: </b>${element.manufacturer}; <b>atmospheric speed: </b> ${element.max_atmosphering_speed}; <b>passengers: </b>${element.passengers}</p>
              <a href="https://swapi.dev/api/starships/${index + 1}/" target="_blank" class="card-link">Card link</a>
              <a href="https://swapi.dev/api/starships" class="card-link">Another link</a>
            </div>
          </div>
    </div>`
    });
}

function ChangeMessage(message) {
    const msg = document.getElementById("message");
    if (msg.innerHTML != null) {
        msg.innerHTML = message;
    }
    else {
        msg.innerHTML += `${message}`;
    }
    
}