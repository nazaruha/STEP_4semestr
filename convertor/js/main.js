window.addEventListener("load", Init);

const URL = "https://swapi.dev/api/people";

function Init() {
    fetch(URL).then(response => {
        return response.json(); 
    }).then(data => {
        console.log("data => ", data);
        Print(data.results);
    }).catch(error => console.log(error));
}

function Print(persons){
    console.log("\npersons (only 5 fields) => ");
    for (let i = 0; i < persons.length; i++) {
        console.log(`${i}: \{ name: \"${persons[i].name}\", height: \"${persons[i].height}\", mass: \"${persons[i].mass}\", hair_color: \"${persons[i].hair_color}\", skin_color: \"${persons[i].skin_color}\" \}`);
    }
    // console.log("persons => ", persons);
}