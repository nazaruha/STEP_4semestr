//URL with https://gameofthronesquotes.xyz/ url will work if you disable the AdBlocker somehow
const HOUSES_URL = "https://api.gameofthronesquotes.xyz/v1/houses";
let row = document.getElementById("root-row");

window.addEventListener("load", () => {
  Request(HOUSES_URL, PrintHouses);
});

function Request(URL, Callback) {
  fetch(URL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      Callback(data);
    });
}


let collumn = document.createElement("div");
collumn.setAttribute("class", "col-12");


let tbl = document.createElement("table");
tbl.setAttribute("class", "table table-hover");

let tblBody = document.createElement("tbody");

function PrintHouses(houses) {
  console.log(houses);
  row.innerHTML = "";

  houses.forEach(element => {
    collumn.innerHTML = "";
    tbl.innerHTML = "";
    tblBody.innerHTML = "";

    Init_tblBody(element.members);
    Init_tbl(element);
    collumn.appendChild(tbl);
    row.innerHTML += collumn.innerHTML;
    
  });
}

function Init_tblBody(members) {
  tblBody.innerHTML += `<tr style="text-align: center;">
      <td style="border: 1px solid black; width: 50%">Name</td>
      <td style="border: 1px solid black; width: 50%">Slug</td>
    </tr>`;
    members.forEach(element => {
      tblBody.innerHTML += `<tr class="table-light">
        <td onclick="ShowCharacter(this)">${element.name}</td>
        <td onclick="ShowCharacter(this)">${element.slug}</td>
      </tr>`
    });
}

function Init_tbl(element) {
  tbl.innerHTML += `<thead>
      <tr>
        <th scope="col" colspan="2" style="text-align: center; border: 1px solid black;">${element.name}</th>
      </tr>
    </thead>
    ${tblBody.innerHTML}`;
}

function ShowCharacter(e) {
  console.log(e);
  let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById("modal.html"));
  modal.show();
}