const btn = document.querySelector(".btn");
const title = document.querySelector(".title");

function ChangeTitle() {
  title.textContent = "New header";
}

btn.addEventListener("click", ChangeTitle);
title.addEventListener("mouseenter", function () {
  console.log(this);
  this.style.color = "red";
});

title.addEventListener("mouseleave", function () {
  this.style.color = "black";
});

const div1 = document.querySelector(".div1");
const div2 = document.querySelector(".div2");
const div3 = document.querySelector(".div3");

div1.addEventListener("click", function () {
  event.stopPropagation(); // крч щоб всі зміни відбувались до конкретного елемента\класу\айді
  console.log("DIV 1");
  this.style.background = "green";
});

div2.addEventListener("click", function () {
  event.stopPropagation();
  console.log("DIV 2");
  this.style.background = "green";
});

div3.addEventListener("click", function () {
  event.stopPropagation();
  console.log("DIV 3");
  this.style.background = "green";
});

const input = document.querySelector(".input");
input.addEventListener("keypress", function () {
  if (event.keyCode < 65 || event.keyCode > 90) {
    event.preventDefault(); // тіпа виходить з функції (в основном діє з form тіпа)
  }
  console.log(event.keyCode);
});

const dangerBtn = document.querySelector(".danger");
dangerBtn.addEventListener("click", function () {
  while (true) {}
});
