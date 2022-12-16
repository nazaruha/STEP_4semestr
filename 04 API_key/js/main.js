// const root = document.getElementById("root");
// const div = document.createElement("div");

// window.addEventListener("load", InitWindow);

// function InitWindow() {
//     div.setAttribute("class", "row");
//     root.appendChild(div);
//     console.log(root);
//     Request("https://newsapi.org/v2/top-headlines?country=us&apiKey=", "0cf23efd65244d2d84aa7c3bb67392f7", GetData)
// }

// function Request(API_URL, API_KEY, Callback) {
//     const URL = API_URL + API_KEY;
//     Callback(URL, PrintData);
// }

// function GetData(URL, Callback) {
//     fetch(URL).then(response => {
//         return response.json();
//     }).then(data => {
//         console.log(data);
//         Callback(data.articles);
//     }).catch(error => console.log(error));
// }

// function PrintData(articles) {
//     div.innerHTML = ""; 
//     articles.forEach((element, index) => {
//         if (index == 10) {
//             root.appendChild(div);
//             return;
//         }
//         div.innerHTML += `<div class="col-lg-4 col-md-6 mt-2">
//         <div class="card" style="width: 18rem;">
//             <div class="card-body">
//               <h5 class="card-title">${element.name}</h5>
//               <h6 class="card-subtitle mb-2 text-muted">${element.author}</h6>
//               <p class="card-text"><b>${element.title}</b><br>${element.description}</p>
//               <a href="${element.url}" target="_blank" class="card-link">Card link</a>
//             </div>
//           </div>
//         </div>`;
//     });
// }


const MAIN_URL = `https://thronesapi.com/api/v2/Characters`;
let row = document.getElementById("root-row");

window.addEventListener("load", () => {
    Request(MAIN_URL, PrintCharacters);
});

function Request(URL, Callback) {
    fetch(URL).then(response => {
        return response.json();
    }).then(data => {
        Callback(data);
    });
}

function PrintCharacters(characters) {
    console.log(characters);
    row.innerHTML = "";
    characters.forEach(element => {
        row.innerHTML += `<div class="col-lg-4 col-md-6">
        <div class="card mb-3">
          <h3 class="card-header">${element.fullName}</h3>
          <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <h6 class="card-subtitle text-muted">${element.family}</h6>
          </div>
          <img src="${element.imageUrl}" alt="${element.image}" class="img-fluid">
          <div class="card-body">
            <a href="${element.imageUrl}" target="_blank" class="card-link">Image link</a>
            <a href="https://thronesapi.com/" target="_blank" class="card-link">API link</a>
          </div>
          <div class="card-footer text-muted">
            Now
          </div>
        </div>
      </div>`;

    });
}