const MAIN_URL = `https://thronesapi.com/api/v2/Characters`;
let row = document.getElementById("root-row");
const searchField = document.getElementById("search");


window.addEventListener("load", () => {
    Request(MAIN_URL, PrintCharacters);
});

searchField.addEventListener("input", () => {
  text = searchField.value;
  fetch(MAIN_URL).then(response => {
    return response.json();
  }).then(data => {
    if (text.length == 0) {
      PrintCharacters(data);
    }
    else {
      PrintSearchCharacters(data, text.toLowerCase());
    }
  });
  
})

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
          <img src="${element.imageUrl}" alt="${element.image}" class="img-fluid" style="width: 70%; display: flex;">
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

function PrintSearchCharacters(characters, text) {
  row.innerHTML = "";
  characters.forEach(element => {
    if (element.fullName.toLowerCase().includes(text)) {
      row.innerHTML += `<div class="col-lg-4 col-md-6">
        <div class="card mb-3">
          <h3 class="card-header">${element.fullName}</h3>
          <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <h6 class="card-subtitle text-muted">${element.family}</h6>
          </div>
          <img src="${element.imageUrl}" alt="${element.image}" class="img-fluid" style="width: 70%; display: flex;">
          <div class="card-body">
            <a href="${element.imageUrl}" target="_blank" class="card-link">Image link</a>
            <a href="https://thronesapi.com/" target="_blank" class="card-link">API link</a>
          </div>
          <div class="card-footer text-muted">
            Now
          </div>
        </div>
      </div>`;
    }
  })
}