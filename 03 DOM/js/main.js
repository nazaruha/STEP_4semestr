// const arr = new Array(1, 5, 6, 7, 8, 9);
// console.log(arr);

// let aaa = 10;

/* DIFFERENT WINDOW FIELDS */
// console.log("WINDOW => ", window);
// console.log("LOCATION => ", window.navigator.userAgent); // з якого браузера сиддить юзер
// console.log("LOCATION => ", window.navigator.language); // дефолтна мова браузера
// console.log("LOCATION => ", window.navigator.platform); // ОС компа
// console.log("LOCATION => ", window.navigator.vendor); // поточний браузер вибиває
// console.log("DOCUMENT => ", /*window.*/document); // для того щоб доступитись до dom дерева (html файла)
// console.log("HISTORY => ", history); // відображує деякі минулі сайти на яких був юзер


// const root = document.getElementById("root"); // getElementById на 3 мілі секунди швидший за querySelector, бо там сразу понятно шо Id шукаєм, а в querySelector він перевіряє ще шо ми саме хочемо вибрати, але тікі мілі секунди особо різниці відчутної не дає
const root = document.querySelector("#root");
const div = document.createElement("div");
div.setAttribute("class", "testClass");
// div.innerHTML = "Lorem ipsum dolor sin amet";
GetSomeData();
root.appendChild(div);
console.log(root);

function GetSomeData() {
    GetBrowser();
    GetOS();
    GetLanguage();
    GetInternet();

    function GetBrowser() {
        div.innerHTML += "Browser: ";
        if (navigator.userAgent.includes('Firefox/')) {
            div.innerHTML += "Firefox";
        } else if (navigator.userAgent.includes('Edg/')) {
            div.innerHTML += "Edge";
        } else if (navigator.userAgent.includes('Chrome/')) {
            div.innerHTML += "Chrome";
        } else if (navigator.userAgent.includes('Safari/')) {
            div.innerHTML += "Safari";
        }
        div.innerHTML += "<br>";
    }
    
    function GetOS() {
        div.innerHTML += `OS: ${navigator.platform}<br>`;
    }
    
    function GetLanguage() {
        div.innerHTML += `Language: ${navigator.language}<br>`;
    }
    
    function GetInternet() {
        div.innerHTML += `Internet: ${navigator.connection.effectiveType}<br>`;
    }
}







