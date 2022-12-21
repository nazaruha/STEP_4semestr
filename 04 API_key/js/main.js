const MAIN_URL = `https://thronesapi.com/api/v2/Characters`;
let row = document.getElementById("root-row");
let root = document.getElementById("root");
const searchField = document.getElementById("search");
const btnNext = document.getElementById("btn-next");
const btnPrev = document.getElementById("btn-prev");
const currentPage = document.getElementById("btn-page");
let onPage = 1;
let charactersLength = 0;
var lastId = 20;
var firstId = 0;


window.addEventListener("load", () => {
    Request(MAIN_URL, PrintNext20Characters);
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
  //FOR OUTPUTTING ALL CHARACTERS IN ONE TIME
    // fetch(URL).then(response => {
    //     return response.json();
    // }).then(data => {
    //     Callback(data);
    //     console.log(data);
    //     SetCurrentPage(data.length);
    // });

    
    Callback(URL, firstId, lastId);
}

btnNext.addEventListener("click", function() {
  onPage++;
  firstId = lastId;
  lastId += 20;
  PrintNext20Characters(MAIN_URL, firstId, lastId);
})

btnPrev.addEventListener("click", function() {
  onPage--;
  firstId -= 20;
  lastId -= 20;
  PrintNext20Characters(MAIN_URL, firstId, lastId);
})

function PrintCharacters(characters) {
    console.log(characters);
    row.innerHTML = "";
    characters.forEach(element => {
        row.innerHTML += `<div class="col-lg-4 col-md-6 col-character">
        <div class="card mb-3">
          <h3 class="card-header">${element.fullName}</h3>
          <div class="card-header">
            <h5 class="card-title">${element.title}</h5>
            <h6 class="card-subtitle text-muted">${element.family}</h6>
          </div>
          <div class="card-body">
            <img src="${element.imageUrl}" alt="${element.image}" class="img-fluid" id="card-photo">
          </div>
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

function PrintNext20Characters(URL, begin, end) {
  fetch(URL).then(response => {
    return response.json();
  }).then(data => {
    row.innerHTML = "";
    for (let i = begin; i < end; i++) {
      try {
        row.innerHTML += `<div class="col-lg-4 col-md-6 col-character">
        <div class="card mb-3">
          <h3 class="card-header">${data[i].fullName}</h3>
          <div class="card-header">
            <h5 class="card-title">${data[i].title}</h5>
            <h6 class="card-subtitle text-muted">${data[i].family}</h6>
          </div>
          <div class="card-body">
            <img src="${data[i].imageUrl}" alt="${data[i].image}" class="img-fluid" id="card-photo">
          </div>
          <div class="card-body">
            <a href="${data[i].imageUrl}" target="_blank" class="card-link">Image link</a>
            <a href="https://thronesapi.com/" target="_blank" class="card-link">API link</a>
          </div>
          <div class="card-footer text-muted">
            Now
          </div>
        </div>
      </div>`;
      } catch {
        SetCurrentPage(data.length);
        return;
      }
    }
    SetCurrentPage(data.length);
  })
  
}

function PrintSearchCharacters(characters, text) {
  row.innerHTML = "";
  characters.forEach(element => {
    if (element.fullName.toLowerCase().includes(text)) {
      row.innerHTML += `<div class="col-lg-4 col-md-6 col-character">
        <div class="card mb-3">
          <h3 class="card-header">${element.fullName}</h3>
          <div class="card-header">
            <h5 class="card-title">${element.title}</h5>
            <h6 class="card-subtitle text-muted">${element.family}</h6>
          </div>
          <div class="card-body">
            <img src="${element.imageUrl}" alt="${element.image}" class="img-fluid" id="card-photo">
          </div>
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
  
  function ChangeColView() {
    let colCharacter = document.getElementsByClassName("col-character");
  console.log(colCharacter);
  if (colCharacter.length == 1) {
    colCharacter[0].setAttribute("class", "col-auto col-character");
    root.style.justifyContent = "center";
  }
  else {
    for (let i = 0; i < colCharacter.length; i++) {
      colCharacter[i].setAttribute("class", "col-lg-4 col-mg-6 col-character");
    }
    root.style.justifyContent = "space-between";
  }
  }
  ChangeColView();
}

function SetCurrentPage(length) {
  btnNext.disabled = false;
  btnPrev.disabled = false;
  charactersLength = length;
  let number = length / 20;
  let afterDot = length % 20;

  let pages = Math.floor(number);
  if (afterDot != 0) {
    pages += 1;
  }
  currentPage.innerHTML = `${onPage}/${pages}`;
  if (onPage == pages) {
    btnNext.disabled = true;
  }
  if (onPage == 1) {
    btnPrev.disabled = true;
  }
}